package bitcamp.myapp.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.myapp.dao.BoardDao;
import bitcamp.myapp.dao.MemberDao;
import bitcamp.myapp.dao.MemberFileDao;
import bitcamp.myapp.service.MemberService;
import bitcamp.myapp.vo.Member;
import bitcamp.myapp.vo.MemberFile;

@Service
public class DefaultMemberService implements MemberService {

  @Autowired private MemberDao memberDao;
  @Autowired private BoardDao boardDao;
  @Autowired private MemberFileDao memberFileDao;
  @Transactional
  @Override
  public void add(Member member) {
    memberDao.insert(member);
  }

  @Override
  public List<Member> list(String keyword) {
    return memberDao.findAll();
  }

  @Override
  public List<Member> memberlist(String keyword) {
    return memberDao.allMember();
  }
  @Override
  public boolean isEmailDuplicated(String email) {
    return memberDao.findByEmail(email) != null;
  }

  @Override
  public boolean isNickNameDuplicated(String nickName) {
    return memberDao.findByNickName(nickName) != null;
  }


  @Override
  public Member get(int no) {
    return memberDao.findByNo(no);
  }

  @Override
  public Member get(String email, String password) {
    Map<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);

    return memberDao.findByEmailAndPassword(paramMap);
  }

  //  @Transactional
  //  @Override
  //  public void update(Member member) {
  //    if (memberDao.update(member) == 1 ) {
  //    } else {
  //      throw new RuntimeException("회원이 존재하지 않습니다.");
  //    }
  //  }
  @Transactional
  @Override
  public void update(Member member) {
    if (memberDao.update(member) == 0) {
      throw new RuntimeException("게시글이 존재하지 않습니다!");
    }
    if (member.getAttachedFiles().size() > 0) {
      memberFileDao.insertList(member.getAttachedFiles());
    }
  }

  @Transactional
  @Override
  public void delete(int no) {
    if (memberDao.delete(no) == 1 ) {
    } else {
      throw new RuntimeException("회원이 존재하지 않습니다.");
    }
  }

  @Transactional
  @Override
  public void deleteLikes(int no) {
    memberDao.deleteLikes(no);
  }
  @Transactional
  @Override
  public void deleteComments(int no) {
    memberDao.deleteComments(no);
  }
  @Transactional
  @Override
  public void deleteFollows(int no) {
    memberDao.deleteFollows(no);
  }
  @Transactional
  @Override
  public void deleteQnas(int no) {
    memberDao.deleteQnas(no);
  }

  @Override
  public MemberFile getFile(int fileNo) {
    return memberFileDao.findByNo(fileNo);
  }

  @Override
  public void deleteFile(int fileNo) {
    memberFileDao.delete(fileNo);
  }

  @Override
  public Member get(String email) {
    return memberDao.findByEmail(email);
  }
}







