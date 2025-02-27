import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import AuthFace from "@/assets/images/face_scan_black.gif";
import { useNavigate } from "react-router-dom";

function FaceAuth() {
  const [tempAccount, setTempAccount] = useState<any>("");
  const [localUserStream, setLocalUserStream] = useState<any>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceApiLoaded, setFaceApiLoaded] = useState(false);
  const [loginResult, setLoginResult] = useState("PENDING");
  const [imageError, setImageError] = useState(false);
  const [counter, setCounter] = useState(5);
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState<any>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceApiIntervalRef = useRef<any>(null);

  // 记录截取的照片次数
  const [photoNumber, setPhotoNumber] = useState<number>(0);
  // 存储图片base64
  const [imgSrc, setImgSrc] = useState<string>("");
  // 是否张嘴判断
  const [isOpenMouth, setIsOpenMouth] = useState<boolean>(false);
  //上一次鼻子的水平坐标
  const [lastNoseXaxis, setLastNoseXaxis] = useState<number>(0);
  // 上一次鼻子的垂直坐标
  const [lastNoseYaxis, setLastNoseYaxis] = useState<number>(0);
  // 上一次嘴巴张开的高度
  const [lastMouthOpenHeight, setLastMouthOpenHeight] = useState<number>(0);

  // 张嘴次数
  const [mouthNum, setMouthNum] = useState<number>(0);
  // 时间范围
  const [timeNode, setTimeNode] = useState<number>(0);
  // 存储每次识别到人脸时左轮廓线中间点距离鼻点的距离
  const [leftFaceDistance, setLeftFaceDistance] = useState<number[]>([]);
  const [rightFaceDistance, setRightFaceDistance] = useState<number[]>([]);
  // 向左向右转的次数
  const [handCounter, setHandCounter] = useState<number>(0);
  // 上一次鼻尖的坐标位置
  const [noseXaxis, setNoseXaxis] = useState<number>(0);
  const [noseYaxis, setNoseYaxis] = useState<number>(0);
  const [lastDistanceEyeNorse, setLastDistanceEyeNorse] = useState<number>(0);

  // 提示文本
  const [tipTxt, setTipTxt] = useState<string>("");

  const videoWidth = 300;
  const videoHeight = 460;

  const navigate = useNavigate();

  // if (!location?.state) {
  //   return <Navigate to="/" replace={true} />;
  // }

  const loadModels = async () => {
    // 加载face-api需要的模型
    // const uri = import.meta.env.DEV ? "/models" : "/react-face-auth/models";
    const uri = "/models";
    Promise.all([
      await faceapi.nets.tinyFaceDetector.loadFromUri(uri),
      await faceapi.nets.ssdMobilenetv1.loadFromUri(uri),
      await faceapi.nets.faceLandmark68Net.loadFromUri(uri),
      await faceapi.nets.faceRecognitionNet.loadFromUri(uri),
      await faceapi.nets.faceExpressionNet.loadFromUri(uri),
    ])
      .then(async () => {
        const labeledFaceDescriptors = await loadLabeledImages();
        setLabeledFaceDescriptors(labeledFaceDescriptors);
      })
      .then(() => setModelsLoaded(true))
      .then(() => {
        getLocalUserVideo();
      })
      .catch(() => {
        // 模型加载失败，即将重试
        loadModels();
      });
  };

  // useEffect(() => {
  //   setTempAccount(location?.state?.account);
  // }, []);
  useEffect(() => {
    // if (tempAccount) {
    loadModels();
    // .then(async () => {
    //   const labeledFaceDescriptors = await loadLabeledImages();
    //   setLabeledFaceDescriptors(labeledFaceDescriptors);
    // })
    // .then(() => setModelsLoaded(true))
    // .then(() => {
    //   // 模型加载成功，正在开启摄像头检测人脸
    //   getLocalUserVideo();
    // });
    // }
  }, []);
  // useEffect(()=>{

  // })

  useEffect(() => {
    if (loginResult === "SUCCESS") {
      const counterInterval = setInterval(() => {
        setCounter(counter => counter - 1);
      }, 1000);

      if (counter === 0) {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.srcObject = null;
        }
        localUserStream.getTracks().forEach((track: any) => {
          track.stop();
        });
        clearInterval(counterInterval);
        clearInterval(faceApiIntervalRef.current);
        localStorage.setItem(
          "faceAuth",
          JSON.stringify({ status: true, account: tempAccount })
        );
        navigate("/protected", { replace: true });
      }

      return () => clearInterval(counterInterval);
    }
    setCounter(5);
  }, [loginResult, counter]);

  const getLocalUserVideo = async () => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
        setLocalUserStream(stream);
      })
      .catch(err => {
        console.error("error:", err);
      });
  };
  // 截取视频中符合条件的图片
  const getPhoto = async () => {
    const canvasContxt = canvasRef.current?.getContext("2d");
    setPhotoNumber(photoNumber => photoNumber++);
    canvasContxt!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    canvasContxt!.drawImage(
      videoRef.current as HTMLVideoElement,
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
    // let dataUrl = canvasRef.current.toDataURL('image/jpeg', 1);
    // imgbase64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    let snapData = canvasRef.current!.toDataURL("image/png");
    let imgSrc = "data:image/png;" + snapData;
    // if (photoNumber == 1) {
    //   this.firstfaceImg = imgSrc;
    // } else {
    setImgSrc(imgSrc);
    localStorage.setItem("userFace", imgSrc);
    localStorage.setItem("userInfo", "admin");
    alert(imgSrc);
    const labeledFaceDescriptors = await loadLabeledImages();
    setLabeledFaceDescriptors(labeledFaceDescriptors);
    // 把该图片数据传给后端  做相关校验
    // }
  };
  // 张嘴判断
  const openMouth = (positions: any) => {
    // 63:上嘴唇底部中间点 67：下嘴唇顶部中间点
    let mouth_distance = positions[67].y - positions[63].y;
    let nose_distance_y = positions[31].y;
    let nose_distance_x = positions[31].x;
    // console.log(Math.abs(nose_distance_x-this.last_nose_distance_x))
    if (
      Math.abs(nose_distance_y - lastNoseYaxis) > 3 &&
      Math.abs(lastNoseXaxis - nose_distance_x) > 4
    ) {
      setTipTxt("请保持头部不要晃动");
    } else {
      setTipTxt("请张张嘴巴");
    }
    setLastNoseYaxis(nose_distance_y);
    setLastNoseXaxis(nose_distance_x);
    if (
      lastMouthOpenHeight > 0 &&
      mouth_distance > 0 &&
      // Math.abs() 返回一个绝对值
      Math.abs(lastMouthOpenHeight - mouth_distance) > 6 &&
      Math.abs(lastNoseYaxis - nose_distance_y) < 0.6 &&
      Math.abs(lastNoseXaxis - nose_distance_x) < 0.6
    ) {
      // this.tipTxt='张嘴通过请再眨下眼睛'
      setMouthNum(mouthNum => mouthNum++);
      if (mouthNum > 2) {
        console.log("张嘴通过");
        setTipTxt("验证中，请稍等...");
        setIsOpenMouth(true);
        setLastMouthOpenHeight(0);
        setMouthNum(0);
      }
    }
    setLastMouthOpenHeight(mouth_distance);
  };

  // 判断摇头
  const shakeHead = (positions: any) => {
    if (positions.length == 0) {
      return;
    }
    // 指定时间段内收集参数
    if (
      timeNode == 0 ||
      (new Date().getTime() - timeNode > 500 && new Date().getTime() - timeNode < 10000)
    ) {
      // console.log(positions[62][0])
      // 计算鼻尖和左边轮廓线中间点的水平差值
      let l_diff_x = positions[31].x - positions[2].x;
      // 计算鼻尖和左边轮廓线中间点的垂直差值
      let l_diff_y = positions[31].y - positions[2].y;
      // 计算鼻尖点与左边轮廓线中间点的距离
      let l_distance = Math.pow(l_diff_x * l_diff_x + l_diff_y * l_diff_y, 0.5);
      // 计算鼻尖和右边轮廓线中间点的水平差值
      let r_diff_x = positions[16].x - positions[31].x;
      // 计算鼻尖点和右边轮廓线中间点的垂直差值
      let r_diff_y = positions[16].y - positions[31].y;
      // 计算鼻尖与右边轮廓线中间点的距离
      let r_distance = Math.pow(r_diff_x * r_diff_x + r_diff_y * r_diff_y, 0.5);
      // 计算出左右轮廓线中间点的水平差值
      // let lr_diff_x = positions[16].x - positions[2].x;
      // // 计算出左右轮廓线中间点的垂直差值
      // let lr_diff_y = positions[16].y - positions[2].y;
      // // 计算出左右轮廓线两中间点的直线距离
      // let lr_distance = Math.pow(lr_diff_x * lr_diff_x + lr_diff_y * lr_diff_y, 0.5);
      // 计算出左右两轮廓线中间点距离鼻尖的差值
      // 向左扭头l_distance < r_distance;
      // 向右扭头l_distance > r_distance;
      // let DIF = Math.abs( l_distance - r_distance);
      setLeftFaceDistance(leftFaceDistance => [...leftFaceDistance, l_distance]);
      setRightFaceDistance(rightFaceDistance => [...rightFaceDistance, r_distance]);
      // 验证是否摇头
      if (
        (l_distance > r_distance &&
          Math.abs(l_distance - leftFaceDistance[0]) > 20 &&
          Math.abs(r_distance - rightFaceDistance[0]) > 30) ||
        (l_distance < r_distance &&
          Math.abs(l_distance - leftFaceDistance[0]) > 30 &&
          Math.abs(r_distance - rightFaceDistance[0]) > 50)
      ) {
        setHandCounter(handCounter => handCounter++);
      }
      if (handCounter > 1) {
        console.log("摇头已验证通过");
        getPhoto();
        setHandCounter(0);
        setLeftFaceDistance([]);
        setRightFaceDistance([]);
      }
      // 重置时间因素 记录当前数据为上一次的记录
      setTimeNode(new Date().getTime());
    }
  };

  // 判断眨眼
  const twinkle = (positions: any) => {
    // 38,39左眼皮上方两个点    42，41左眼皮下方两个点
    // 44,45右眼皮上方两个点    48，47右眼皮下方两个点
    // 计算左眼睛上下中间的距离
    // let l_eye_distance_1 =  positions[38].y - positions[42].y;
    // let l_eye_distance_2 =  positions[39].y - positions[41].y;
    // let r_eye_distance_1 =  positions[48].y - positions[44].y;
    // let r_eye_distance_2 =  positions[47].y - positions[45].y;
    // console.log(l_eye_distance_1,l_eye_distance_2,r_eye_distance_1,r_eye_distance_2)
    if (positions.length == 0) {
      return;
    }
    if (timeNode == 0 || new Date().getTime() - timeNode > 10) {
      let xdiff1 = positions[31].x - positions[38].x;
      let ydiff1 = positions[31].y - positions[38].y;
      // 计算出做左眼睛上眼皮某点距离鼻尖的距离
      let dis_eye_norse1 = Math.pow(xdiff1 * xdiff1 + ydiff1 * ydiff1, 0.5);
      let xdiff2 = positions[31].x - positions[45].x;
      let ydiff2 = positions[31].y - positions[45].y;
      // 计算出做左眼睛上眼皮某间点距离鼻尖的距离
      let dis_eye_norse2 = Math.pow(xdiff2 * xdiff2 + ydiff2 * ydiff2, 0.5);
      // 计算出左右两个眼睛距离同一处鼻尖的距离之和
      let dis_eye_norse = dis_eye_norse1 + dis_eye_norse2;
      // console.log(Math.abs(dis_eye_norse, this.last_dis_eye_norse));
      if (
        Math.abs(positions[31].x - noseXaxis) < 0.5 &&
        Math.abs(positions[31].y - noseYaxis) < 0.5
      ) {
        // if ((Math.abs(dis_eye_norse - this.last_dis_eye_norse) > 0.8)) {
        if (ydiff1 > 1000) {
          setTipTxt("眼睛验证通过");
          getPhoto();
          setNoseXaxis(0);
          setNoseYaxis(0);
          setLastDistanceEyeNorse(0);
          setTimeNode(0);
          // 设置标志值
          // isTwinkle = true;
        }
      }
      setNoseXaxis(positions[31].x);
      setNoseYaxis(positions[31].y);
      setLastDistanceEyeNorse(dis_eye_norse);
      setTimeNode(new Date().getTime());
    }
  };

  const scanFace = async () => {
    if (videoRef.current!.paused || videoRef.current!.ended || !modelsLoaded) {
      setTimeout(() => scanFace());
    }
    const displaySize = {
      width: videoWidth,
      height: videoHeight,
    };
    faceapi.matchDimensions(canvasRef.current as HTMLCanvasElement, displaySize);
    const faceApiInterval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(
          videoRef.current as HTMLVideoElement,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 128 })
        )
        // 生成面部标志点
        .withFaceLandmarks()
        // 面部表情检测
        .withFaceExpressions()
        // 获取面部标识符
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      if (resizedDetections.length == 0) {
        setTipTxt("未检测到人脸");
      } else {
        // 限定人脸在圆框中展示的位置
        if (
          resizedDetections[0].alignedRect.relativeBox.top > 0.55 ||
          resizedDetections[0].alignedRect.relativeBox.left < 0.2 ||
          resizedDetections[0].alignedRect.relativeBox.right > 0.8 ||
          resizedDetections[0].alignedRect.relativeBox.bottom > 0.98
        ) {
          setTipTxt("请将脸对正中间");
        } else {
          if (photoNumber == 0) {
            getPhoto();
          }
          // 请张张嘴巴
          const landmarks = resizedDetections[0].landmarks;
          const landmarkPositions = landmarks.positions;
          // 或者得到各个轮廓的位置，
          // 仅适用于68点面部标记(FaceLandmarks68)
          // const jawOutline = landmarks.getJawOutline()
          // const nose = landmarks.getNose()
          // const mouth = landmarks.getMouth()
          // const leftEye = landmarks.getLeftEye()
          // const rightEye = landmarks.getRightEye()
          // const leftEyeBbrow = landmarks.getLeftEyeBrow()
          // const rightEyeBrow = landmarks.getRightEyeBrow()
          if (!isOpenMouth) {
            openMouth(landmarkPositions);
            // 摇头
            shakeHead(landmarkPositions);
            // 眨眼睛 可以添加判断
            twinkle(landmarkPositions);
          }
        }
      }
      if (isOpenMouth) {
        // 截图
        getPhoto();
      } else {
        setTimeout(() => scanFace());
      }

      // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

      // const results = resizedDetections.map(d =>
      //   faceMatcher.findBestMatch(d.descriptor)
      // );

      // if (!canvasRef.current) {
      //   return;
      // }
      // canvasRef.current.getContext("2d")!.clearRect(0, 0, videoWidth, videoHeight);
      // faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

      // if (results.length > 0 && tempAccount.id === results[0].label) {
      //   setLoginResult("SUCCESS");
      // } else {
      //   setLoginResult("FAILED");
      // }

      if (!faceApiLoaded) {
        setFaceApiLoaded(true);
      }
    }, 1000 / 15);
    faceApiIntervalRef.current = faceApiInterval;
  };

  async function loadLabeledImages() {
    if (!localStorage.getItem("userFace")) {
      return null;
    }
    const descriptions = [];

    let img;

    try {
      const imgPath = localStorage.getItem("userFace");
      // tempAccount?.type === "CUSTOM"
      //   ? tempAccount.picture
      //   : // : import.meta.env.DEV
      //     // ? `/temp-accounts/${tempAccount.picture}`
      //     // : `/react-face-auth/temp-accounts/${tempAccount.picture}`;
      //     `/temp-accounts/${tempAccount.picture}`;

      img = await faceapi.fetchImage(imgPath as string);
    } catch {
      setImageError(true);
      return;
    }

    const detections = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      descriptions.push(detections.descriptor);
    }

    // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
    
    // const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));

    // if (!canvasRef.current) {
    //   return;
    // }
    // canvasRef.current.getContext("2d")!.clearRect(0, 0, videoWidth, videoHeight);
    // faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

    // if (results.length > 0 && tempAccount.id === results[0].label) {
    //   setLoginResult("SUCCESS");
    // } else {
    //   setLoginResult("FAILED");
    // }

    return new faceapi.LabeledFaceDescriptors(tempAccount.id, descriptions);
  }

  if (imageError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-[24px] max-w-[840px] mx-auto">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-rose-700 sm:text-4xl">
          <span className="block">
            Upps! There is no profile picture associated with this account.
          </span>
        </h2>
        <span className="block mt-4">
          Please contact administration for registration or try again later.
        </span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-[24px] max-w-[720px] mx-auto">
      {!localUserStream && !modelsLoaded && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">You're Attempting to Log In With Your Face.</span>
          <span className="block text-indigo-600 mt-2">Loading Models...</span>
        </h2>
      )}
      {!localUserStream && modelsLoaded && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-indigo-600 mt-2">
            Please Recognize Your Face to Completely Log In.
          </span>
        </h2>
      )}
      {localUserStream && loginResult === "SUCCESS" && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-indigo-600 mt-2">
            We've successfully recognize your face!
          </span>
          <span className="block text-indigo-600 mt-2">
            Please stay {counter} more seconds...
          </span>
        </h2>
      )}
      {localUserStream && loginResult === "FAILED" && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-rose-700 sm:text-4xl">
          <span className="block mt-[56px]">Upps! We did not recognize your face.</span>
        </h2>
      )}
      {localUserStream && !faceApiLoaded && loginResult === "PENDING" && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block mt-[56px]">Scanning Face...</span>
        </h2>
      )}
      <div>{tipTxt}</div>
      <div className="w-full">
        <div className="relative flex flex-col items-center p-[10px]">
          <video
            muted
            autoPlay
            ref={videoRef}
            height={videoHeight}
            width={videoWidth}
            onPlay={scanFace}
            style={{
              objectFit: "fill",
              height: "360px",
              borderRadius: "10px",
              display: localUserStream ? "block" : "none",
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              display: localUserStream ? "block" : "none",
            }}
          />
        </div>
        {!localUserStream && (
          <>
            {modelsLoaded ? (
              <>
                <img
                  alt="loading models"
                  src={AuthFace}
                  className="cursor-pointer my-8 mx-auto object-cover h-[272px]"
                />
                <button
                  onClick={getLocalUserVideo}
                  type="button"
                  className="flex justify-center items-center w-full py-2.5 px-5 mr-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg border border-gray-200 inline-flex items-center">
                  Scan my face
                </button>
              </>
            ) : (
              <>
                <img
                  alt="loading models"
                  // src={AuthIdle}
                  className="cursor-pointer my-8 mx-auto object-cover h-[272px]"
                />
                <button
                  disabled
                  type="button"
                  className="cursor-not-allowed flex justify-center items-center w-full py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline mr-2 w-4 h-4 text-gray-200 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Please wait while models were loading...
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FaceAuth;
