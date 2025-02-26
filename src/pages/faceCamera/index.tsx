import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [message, setMessage] = useState<string>("请将您的脸放入框内");
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isFaceInPosition, setIsFaceInPosition] = useState(false);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [timeoutWarning, setTimeoutWarning] = useState(false);
  const [lastDetectionTime, setLastDetectionTime] = useState<number>(Date.now());

  // 防抖函数，控制检测频率
  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // 加载模型
  const loadModels = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  };

  // 启动视频流并获取摄像头权限
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user", width: 320, height: 240 } }) // 降低分辨率
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Error accessing webcam:", err);
        setMessage("无法访问摄像头，请检查权限设置！");
      });
  };

  // 清理视频流
  const stopVideoStream = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop()); // 停止所有轨道
    }
  };

  // 检测人脸并更新提示信息
  const detectFace = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.width, height: video.height };

    // 让 face-api.js 使用该 canvas 绘制结果
    faceapi.matchDimensions(canvas, displaySize);

    // 检测人脸
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    // 绘制检测结果和面部标志点
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections); // 绘制检测框
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections); // 绘制面部标志点

    if (detections.length > 0) {
      setIsFaceDetected(true);

      const detection = detections[0]; // 获取第一个检测到的人脸
      const box = detection.detection.box;

      const centerX = box.left + box.width / 2;
      const centerY = box.top + box.height / 2;
      const videoCenterX = video.width / 2;
      const videoCenterY = video.height / 2;

      // 设置容忍偏差
      const tolerance = 100;

      if (
        Math.abs(centerX - videoCenterX) < tolerance &&
        Math.abs(centerY - videoCenterY) < tolerance
      ) {
        setIsFaceInPosition(true);
        setMessage("请保持静止，稍等片刻"); // 提示静止
        captureFace(box); // 截取人脸
      } else {
        setIsFaceInPosition(false);
        setMessage("请将脸放置在框内"); // 提示未正确对齐
      }
    } else {
      setIsFaceDetected(false);
      setMessage("没有检测到人脸，请将脸放入框内"); // 提示未检测到人脸
    }

    // 防止过于频繁地调用，使用防抖
    debounce(detectFace, 200);

    // 监控是否超过时间未检测到人脸
    if (Date.now() - lastDetectionTime > 5000 && !base64Image) {
      setTimeoutWarning(true);
      setMessage("检测超时，请重试！");
    }
  };

  // 截取人脸并生成 Base64 图片
  const captureFace = (alignedRect: faceapi.Rect) => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // 设置 canvas 尺寸为人脸区域的大小
    canvas.width = alignedRect.width;
    canvas.height = alignedRect.height;

    // 在 canvas 上绘制视频帧中的人脸区域
    ctx.drawImage(
      video,
      alignedRect.left, // 人脸区域的左上角
      alignedRect.top, // 人脸区域的上方
      alignedRect.width, // 人脸区域的宽度
      alignedRect.height, // 人脸区域的高度
      0,
      0, // 在 canvas 中从 (0, 0) 开始绘制
      alignedRect.width,
      alignedRect.height
    );

    // 转换为 Base64 图片
    const base64Image = canvas.toDataURL("image/png");
    setBase64Image(base64Image); // 更新 state
    setTimeoutWarning(false); // 重置超时警告
    setLastDetectionTime(Date.now()); // 更新最后检测时间
  };

  // 启动模型并开始检测
  useEffect(() => {
    loadModels().then(() => {
      startVideo();
      videoRef.current?.addEventListener("play", detectFace);
    });

    // 清理副作用：停止视频流并释放资源
    return () => {
      stopVideoStream(); // 停止视频流
      const video = videoRef.current;
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [lastDetectionTime]);

  return (
    <div className="w-screen h-screen box-border" id="faceCream">
      <div className="flex flex-col justify-center items-center">
        {/* 提示信息 */}
        <div>
          <h2>{message}</h2>
        </div>
        <div>
          <video
            ref={videoRef}
            id="video"
            width="320"
            height="240"
            autoPlay
            muted
          ></video>
          <canvas ref={canvasRef} id="canvas"></canvas>
        </div>
        {/* 显示截取的人脸图像 */}
        {base64Image && !timeoutWarning && (
          <div>
            <h3>截取的人脸图像：</h3>
            <img src={base64Image} alt="Detected Face" />
          </div>
        )}
        {/* 超时提示 */}
        {timeoutWarning && (
          <div>
            <h3>检测超时，请重试！</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
