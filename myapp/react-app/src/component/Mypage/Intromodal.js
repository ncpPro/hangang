import React, { useEffect,useState , useRef,useContext} from "react";
import './css/Intromodal.css';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import Usercontext from '../../Usercontext';


const Intromodal = ({ show, onHide }) => {
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [interest, setInterest] = useState("");
    const [hobby, setHobby] = useState("");
    const [files, setFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const imageInput = useRef(null);
  
    useEffect(() => {
      axios
        .get("http://localhost:8080/web/auth/user")
        .then((response) => {
          return response.data;
        })
        .then((result) => {
          if (result.status === "success") {
            setName(result.data.name);
            setNickName(result.data.nickName);
            setIntroduce(result.data.introduce);
            setInterest(result.data.interest);
            setHobby(result.data.hobby);

          } else {
          }
        })
        .catch((error) => {
          // 에러 처리
        });
    }, []);
  
    const handleUpdate = () => {
      const updateUserData = async () => {
        try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("nickName", nickName);
          formData.append("interest", interest);
          formData.append("introduce", introduce);
          formData.append("hobby", hobby);
  
          // 이미지 파일을 formData에 추가합니다.
          files.forEach((file) => {
            formData.append("files", file);
          });
  
          const response = await axios.post(
            "http://localhost:8080/web/members/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          const result = response.data;
          console.log(result);
          if (result.status === "success") {
  
            alert("수정되었습니다");
          } else {
            alert("수정실패");
          }
        } catch (error) {
          alert("연결실패");
        }
      };
  
      updateUserData();
    };
  
    const onCickImageUpload = () => {
      imageInput.current.click();
    };
  
    const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
  
      // 미리보기 이미지 생성
      const imageFiles = selectedFiles.filter((file) =>
        file.type.startsWith("image/")
      );
      const previewImages = imageFiles.map((imageFile) =>
        URL.createObjectURL(imageFile)
      );
      setPreviewImages(previewImages);
    };
  
    const handleImageClick = (index) => {
      setSelectedImageIndex(index);
    };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="profilemodify">
          <div className="profile-input">
            <input
              name="introprofile-files"
              type="file"
              placeholder="file"
              className="introprofile-input"
              id="introprofile-file"
              required
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
              ref={imageInput}
            />
            <div className="introprofile-preview-image-box" onClick={onCickImageUpload}>
              <span className="">사진 추가하기</span>
            </div>
            {previewImages.length > 0 && (
              <img
                key={selectedImageIndex}
                src={previewImages[selectedImageIndex]}
                alt={`preview-${selectedImageIndex}`}
                className="introprofile-preview-image"
                width="260px"
                height="260px"
                onClick={onCickImageUpload}
              />
            )}
          </div>
          <p className="profilepick"></p>

          <div className="profilename">
            <h1 className="modifyname">이름 :</h1>
            <input value={name} className="nameinputbox" onChange={(event) => setName(event.target.value)}></input>
          </div>
          <div className="profilenickename">
            <h1 className="modifynick">닉네임 :</h1>
            <input value={nickName} className="nickinputbox" onChange={(event) => setNickName(event.target.value)}></input>
          </div>
          <div className="profileintro">
            <h1 className="modifyintro">소개글 :</h1>
            <input value={introduce} className="introinputbox" onChange={(event) => setIntroduce(event.target.value)}></input>
          </div>
          <div className="profileinter">
            <h1 className="modifyinter">관심분야 :</h1>
            <input value={interest} className="interinputbox" onChange={(event) => setInterest(event.target.value)}></input>
          </div>
          <div className="profilehob">
            <h1 className="modifyhob">취미 :</h1>
            <input value={hobby} className="hobinputbox" onChange={(event) => setHobby(event.target.value)}></input>
          </div>
          <div className="okno">
            <button className="modify" onClick={handleUpdate}>수정</button>
            <button className="cancel">취소</button>
          </div>
        </div>

        {/* <Button onClick={onHide}>Close</Button> */}
      </Modal.Body>
      {/* <Modal.Footer>
      </Modal.Footer> */}
    </Modal>
  );
};

export default Intromodal;