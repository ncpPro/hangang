package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Member;
import bitcamp.myapp.vo.MemberFile;

public interface MemberService {
  void add(Member member);
  void upload(Member member);
  List<Member> list(String keyword);
  Member get(int no);
  Member get(String email, String password);
  void update(Member member);
  void delete(int no);

  MemberFile getFile(int fileNo);
  void deleteFile(int fileNo);
}





