import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
import AuthFace from "@/assets/images/face_scan_black.gif";
import * as vision from '@mediapipe/tasks-vision'
import { useNavigate } from "react-router-dom";
import { BackIcon } from "@/pages/face/index";
import {Slider} from '@heroui/react'
function FaceAuth() {
  const [tempAccount, setTempAccount] = useState<any>("");
  const [localUserStream, setLocalUserStream] = useState<any>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceApiLoaded, setFaceApiLoaded] = useState(false);
  const [loginResult, setLoginResult] = useState("PENDING");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [counter, setCounter] = useState(5);
  const faceApiIntervalRef = useRef<any>(null);
  const [initiall,setInitaill] =useState<boolean>(false)
  const [isTextFaceNumber,setIsTextFaceNumber]=useState<number>(0)


  // 获取vision参数
  const { FaceLandmarker, DrawingUtils } = vision
  // 初始化需要参数
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingUtils = useRef<vision.DrawingUtils>(null);
  const faceLandmarker = useRef<vision.FaceLandmarker>(null)
 const faceDetectorRef=useRef<vision.FaceDetector>(null)
 const [faceNumber, setFaceNumber] = useState<number>(0)

  async function createFaceLandmarker() {
   
    // const FileSetResolver = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm')
    const wasmBinaryPath = new URL('./vision_wasm_internal.wasm', import.meta.url).href
    const wasmLoaderPath = new URL('./vision_wasm_internal.js', import.meta.url).href
    const modelAssetPath = new URL('./vision_face_landmarker.task', import.meta.url).href
    const modeFaceDetectorPath = new URL('./blaze_face_short_range.tflite', import.meta.url).href
    faceLandmarker.current = await FaceLandmarker.createFromOptions(
      {
        wasmBinaryPath,
        // wasmBinaryPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm/vision_wasm_internal.wasm',
        wasmLoaderPath,
        // wasmLoaderPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm/vision_wasm_internal.js',
      },
      {
        runningMode: "VIDEO",
        baseOptions: {
          modelAssetPath,
          // modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: 'GPU',
        },
        // runningMode: runningMode,
        outputFaceBlendshapes: true,
        outputFacialTransformationMatrixes: true,
        numFaces: 1,
      },
    )
    faceDetectorRef.current = await vision.FaceDetector.createFromOptions(
      {
        wasmBinaryPath,
        // wasmBinaryPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm/vision_wasm_internal.wasm',
        wasmLoaderPath,
        // wasmLoaderPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm/vision_wasm_internal.js',
      },
      {
        runningMode: "VIDEO",
        baseOptions: {
          modelAssetPath:modeFaceDetectorPath,
          // modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: 'GPU',
        }
      },
    )
  }



  // 记录截取的照片次数
  const [photoNumber, setPhotoNumber] = useState<number>(0);
  // 存储图片base64
  const [imgSrc, setImgSrc] = useState<string>("");


  // 提示文本
  const [tipTxt, setTipTxt] = useState<string>("");

  const videoWidth = 300;
  const videoHeight = 460;

  const navigate = useNavigate();



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
  const hasGetUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  }

  const getLocalUserVideo = async () => {
    if (!hasGetUserMedia()) {
      setTipTxt('getUserMedia() is not supported by your browser')
      return
    }
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
        setLocalUserStream(stream);
        setTipTxt('正在检测中,请保持头部在摄像头范围内');
      })
      .catch(err => {
        console.error("error:", err);
      });
  };
  // 截取视频中符合条件的图片
  const getPhoto = async () => {
    const canvasContxt = canvasRef.current?.getContext("2d");
    setPhotoNumber(photoNumber => photoNumber++);
    canvasContxt!.clearRect(0, 0, videoRef.current!.width, videoRef.current!.height);
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
    // alert(imgSrc);
    // const labeledFaceDescriptors = await loadLabeledImages();
    // setLabeledFaceDescriptors(labeledFaceDescriptors);
    // 把该图片数据传给后端  做相关校验
    // }
  }


  const faceLandmarksRef = useRef<any>([])
  const [lastVideoTime, setLastVideoTime] = useState<number>(-1)
  const faceLandmarkerResult = useRef<vision.FaceLandmarkerResult>(null)
  const scanFace = async () => {
    // setModelsLoaded(true)
    if (!faceLandmarker.current) {
      setTipTxt('Wait for faceLandmarker to load before clicking!')
      return
    }
    if (!faceDetectorRef.current) {
      alert("Face Detector is still loading. Please try again..");
      return;
    }
    const videoWidth = 300;
    // setVideoLoaded(true);
    const radio = videoRef.current!.videoHeight / videoRef.current!.videoWidth
    // videoRef.current!.style.width = `${videoWidth}px`
    // videoRef.current!.style.height = `${videoWidth * radio}px`
    canvasRef.current!.style.width = `${videoWidth}px`
    canvasRef.current!.style.height = `${videoWidth * radio}px`
    canvasRef.current!.width = videoRef.current!.videoWidth
    canvasRef.current!.height = videoRef.current!.videoHeight
    // runningMode = 'VIDEO'
    // await faceLandmarker.setOptions({ 'VIDEO' })
    const nowInMs = Date.now()
    if (lastVideoTime !== videoRef.current!.currentTime) {
      setLastVideoTime(videoRef.current!.currentTime)
      faceLandmarkerResult.current = faceLandmarker.current!.detectForVideo(videoRef.current!, nowInMs)
      const detections = faceDetectorRef.current.detectForVideo(videoRef.current!, nowInMs)
        .detections;
        displayVideoDetections(detections)
        
    }
    
    if (canvasRef.current) {
      drawingUtils.current = new DrawingUtils(canvasRef.current?.getContext("2d")!)
    }
    faceLandmarkerResult.current!.faceLandmarks.forEach((landmarks) => {
      drawingUtils.current!.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: '#C0C0C070', lineWidth: 1 })
      drawingUtils.current!.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: '#FF3030' })
      drawingUtils.current!.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, { color: '#FF3030' })
      drawingUtils.current!.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: '#30FF30' })
      drawingUtils.current!.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, { color: '#30FF30' })
      drawingUtils.current!.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: '#E0E0E0' })
      drawingUtils.current!.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, { color: '#E0E0E0' })
      drawingUtils.current!.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, { color: '#FF3030' })
      drawingUtils.current!.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, { color: '#30FF30' })
    })
   
    // console.log(faceLandmarkerResult.current)
    if (faceLandmarkerResult.current && faceLandmarkerResult.current!.faceBlendshapes?.length){ 
      faceLandmarksRef.current = faceLandmarkerResult.current.faceBlendshapes[0].categories;
      
    }else{
      faceLandmarksRef.current = []
    }
    setIsTextFaceNumber(faceLandmarksRef.current.length)
    // detectFaceStatus(faceLandmarksRef.current)
    // console.log(JSON.stringify(faceLandmarksRef.current))
    window.requestAnimationFrame(scanFace)
  };

  const displayVideoDetections=(detections: any[])=> {
    for (let detection of detections) {
      setFaceNumber(()=>Math.round(parseFloat(detection.categories[0].score) * 100))  
    }
  }
  useEffect(()=>{
    if(faceNumber>=98){
      getPhoto()
      setFaceNumber(100)
    }
    if(faceNumber!=0){
      setInitaill(true);
      setTipTxt('')
    }else{
      setInitaill(false);
      
    }
  },[faceNumber])

  useLayoutEffect(() => {
    createFaceLandmarker().then(() => {
      getLocalUserVideo()
    })

  }, [])
  useEffect(()=>{
    if(isTextFaceNumber==0){
      setFaceNumber(0)
      }
  },[isTextFaceNumber])

  return (
    <>
      <div className="h-screen box-border">
        <div className="flex p-3 pt-9  items-center justify-between text-2xl">
          <div>
            <BackIcon onClick={() => navigate(-1)} />
          </div>
          <span className="flex-1 text-center">扫脸</span>
        </div>
        <div className="flex flex-col items-center justify-around gap-[24px] max-w-[720px] mx-auto">
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
              <span className="block mt-[56px]">
                Upps! We did not recognize your face.
              </span>
            </h2>
          )}
          {localUserStream && !faceApiLoaded && loginResult === "PENDING" && (
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block mt-[56px]">Scanning Face...</span>
            </h2>
          )}
          <div>{tipTxt}</div>
          <div>{faceNumber}</div>
         {faceNumber!=0 && <Slider
      aria-label="Player progress"
      className="max-w-md"
      color="foreground"
      value={faceNumber}
      hideThumb={true}
    />}
          <div className="w-full">
            <div className="relative flex flex-col items-center p-[10px]">
              <video
                muted
                autoPlay
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onPlay={scanFace}
                preload="auto"
                loop
                // controls 
                controlsList="nodownload nofullscreen noplaybackrate"
                playsInline
                webkit-playsinline="true"
                style={{
                  // transform: "scaleX(-1)",
                  objectFit: "fill",
                  // height: "360px",
                  borderRadius: "10px",
                  display: localUserStream? "block" : "none",
                }}
              />
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  transform: "scaleX(-1)",
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
                    {/* <img
                      alt="loading models"
                      // src={AuthIdle}
                      className="cursor-pointer my-8 mx-auto object-cover h-[272px]"
                    /> */}
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
      </div>
    </>
  );
}

export default FaceAuth;
