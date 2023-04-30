package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Member;
import bitcamp.myapp.vo.MemberFile;

public interface MemberService {
  void add(Member member);
  List<Member> list(String keyword);
  List<Member> memberlist(String keyword);
  Member get(int no);
  Member get(String email);
  Member get(String email, String password);
  boolean isEmailDuplicated(String email);
  boolean isNickNameDuplicated(String nickName);
  void update(Member member);
  void delete(int no);
  MemberFile getFile(int fileNo);
  void deleteFile(int fileNo);
  void deleteLikes(int no);
  void deleteComments(int no);
  void deleteFollows(int no);
  void deleteQnas(int no);


}





