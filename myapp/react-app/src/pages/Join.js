import React,{useState} from 'react';
import './Join.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [hobby, setHobby] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepasswordChange = (event) => {
    setRepassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };
  const handleTelChange = (event) => {
    setTel(event.target.value);
  };
  const handleIntroduceChange = (event) => {
    setIntroduce(event.target.value);
  };
  const handleHobbyChange = (event) => {
    setHobby(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = {
        email: email,
        password: password,
        name: name,
      };
      axios
        .post("http://localhost:8080/web/members", formData)
        .then((response) => {
          const result = response.data;
          if (result.status === "success") {
            window.location.reload();
            window.location.href = "Login";
          } else {
            alert("입력 실패!");
            console.log(result.data);
          }
        })
        .catch((exception) => {
          alert("입력 중 오류가 발생했습니다.");
          console.log(exception);
        });
    }
  };

  const validateForm = () => {
    // 이메일 유효성 검사
    var email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email_regex.test(email)) {
      alert("올바른 이메일 주소를 입력해주세요.");
      return false;
    }

    // 비밀번호 유효성 검사
    if (password.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return false;
    }

    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*()_+])[\d!@#$%^&*()_+]{8,20}$/;
    if (!passwordPattern.test(password)) {
      alert(
        "비밀번호는 8~20자의 영문  숫자, 특수문자 조합이어야 합니다."
      );
      return false;
    }

    // 비밀번호와 재입력한 비밀번호가 일치하는지 검사
    if (password !== repassword) {
      alert("비밀번호와 재입력한 비밀번호가 일치하지 않습니다.");
      return false;
    }

    // 이름이 입력되었는지 검사
    if (name === "") {
      alert("이름을 입력해주세요.");
      return false;
    }

    // 모든 유효성 검사가 통과되면 true를 반환
    return true;
  };

  return (
    <div className="join-container">
         <div className="join-box">
           <h1>HANGANG</h1>
    <form id="join-form" onSubmit={handleSubmit}>
         
         <input 
          name="email"
          type="email"
          placeholder="Email"
          className="join-input-box" 
          id="email" required
          value={email}
          onChange={handleEmailChange} /> 

          <input 
          name="password" 
          type="password" 
          placeholder="password" 
          className="join-input-box" 
          id="pwd" required  
          value={password}
          onChange={handlePasswordChange}/>

          <input 
          name="repassword" 
          type="password" 
          placeholder="repassword" 
          className="join-input-box" 
          id="repwd" required 
          value={repassword}
          onChange={handleRepasswordChange} />

          <input 
          name="name" 
          type="text" 
          placeholder="Name" 
          className="join-input-box" 
          id="name" required 
          value={name} 
          onChange={handleNameChange}/>

          <input 
          name="nickName" 
          type="text" 
          placeholder="Nickname" 
          className="join-input-box" 
          id="nickName" required 
          value={nickname} 
          onChange={handleNicknameChange}/>

          <input name="tel" 
          type="tel" 
          placeholder="Tell" 
          className="join-input-box" 
          id="tel" required 
          value={tel} 
          onChange={handleTelChange} />

          <input name="introduce" 
          type="text" 
          placeholder="Introduce" 
          className="join-input-box" 
          id="introduce" required 
          value={introduce} 
          onChange={handleIntroduceChange}/>

        <input name="hobby" 
        type="text" 
        placeholder="Hobby" 
        className="join-input-box" 
        id="hobby" required 
        value={hobby} 
        onChange={handleHobbyChange} />   
                <button id="btn-regist" type="submit">가입하기</button>       
             <button id="btn-cancel" type="reset">가입취소</button>
        
        <div className="join-signup-box"></div>      
    </form>
    </div>
    </div>
  );
}
// function Join() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const email = formData.get('email');
//     const password = formData.get('password');
//     const repassword = formData.get('repassword');
//     const name = formData.get('name');
//     const nickName = formData.get('nickName');
//     const tel = formData.get('tel');
//     const introduce = formData.get('introduce');
//     const hobby = formData.get('hobby');
//     console.log(email, password, repassword, name, nickName, tel, introduce, hobby);

//     axios.post('http://localhost:8080/web/members', formData)
//       .then(response => response.data)
//       .then(result => {
//         if (result.status === 'success') {
//           window.location.href = '../';
//         } else {
//           alert('입력 실패!');
//         }
//       })
//       .catch(error => {
//         alert('입력 오류!');
//         console.error(error);
//       });

//   };

//   return (
//     <div className="join-container">
//       <div className="join-box">
//         <h1>HANGANG</h1>
//         <form id="join-form" onSubmit={handleSubmit}>
//           <input name="email" type="email" placeholder="Email" className="join-input-box" id="email" required />
//           <input name="password" type="password" placeholder="password" className="join-input-box" id="pwd" required />
//           <input name="repassword" type="password" placeholder="repassword" className="join-input-box" id="repwd" required />
//           <input name="name" type="text" placeholder="Name" className="join-input-box" required />
//           <input name="nickName" type="text" placeholder="Nickname" className="join-input-box" required />
//           <input name="tel" type="tel" placeholder="Tell" className="join-input-box" required />
//           <input name="introduce" type="text" placeholder="Introduce" className="join-input-box" required />
//           <input name="hobby" type="text" placeholder="Hobby" className="join-input-box" required />
//           <button id="btn-regist" type="submit">가입하기</button>
//           <Link to="/Login">
//             <button id="btn-cancel" type="reset">가입취소</button>
//           </Link>
//         </form>
//         <div className="join-signup-box"></div>
//       </div>
//     </div>
//   );
// }

export default Join;
