// client/rappa/src/pages/Record.tsx
import { Card, Input, Layout, Space, Tag, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Components from '../assets/Components';
import WordService from '../services/WordService';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';

const { Header, Content} = Layout;
const { TextArea } = Input;
const { Title } = Typography;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0 50px;
`;

const MainContainer = styled(Content)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 24px 50px;
  background: -webkit-linear-gradient(to right, #0088ff, #7700ff);
  background: linear-gradient(to right, #0088ff, #7700ff);
  gap: 24px;
  margin: 0 auto;
  height: 90vh;
  width: 100vw;
  overflow: auto;
`;

const WordCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Record: React.FC = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id: recordId } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRecord = async () => {
      const user = localStorage.getItem('user');
      if (user && recordId) {
        const parsedRecordId = parseInt(recordId);
        const record = await UserService.getUserRecordById(user, parsedRecordId);
        setTitle(record.title);
        setText(record.content);
      }
    };
    fetchRecord();
  }, [recordId]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && selectedTag) {
      e.preventDefault();
      const currentLineStart = text.lastIndexOf('\n') + 1;
      const currentLineEnd = text.indexOf('\n', currentLineStart);
      const currentLine = text.slice(currentLineStart, currentLineEnd === -1 ? undefined : currentLineEnd);
      const updatedText = `${text.slice(0, currentLineStart)}${currentLine.trim()} ${selectedTag} ${text.slice(currentLineEnd)}`;
      setText(updatedText);
      setSelectedTag(null);
    }
  };

  const [isLastWordActive, setIsLastWordActive] = useState(false);
  const [isLastTwoWordsActive, setIsLastTwoWordsActive] = useState(false);
  const [wordCloudTags, setWordCloudTags] = useState<string[]>([]);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCreateTag = async (count: number) => {
    const words = text.trim().split(' ');
    const lastWord = words[words.length - 1];
    const lastTwoWords = words.slice(-2).join(' ');

    if (lastWord.trim() === '') {
      message.warning('Đừng để trống.');
      return;
    }

    try {
      const prediction = await WordService.predictWord(encodeURIComponent(lastWord));
      if (!prediction.language) {
        message.warning('Web hiện chỉ hỗ trợ vần tiếng Việt.');
        return;
      }
    } catch (error) {
      return;
    }

    if (count === 1 && !isLastWordActive) {
      const rhymeWords = await WordService.getWordsWithSameRhyme(encodeURIComponent(lastWord));
      const newTags = rhymeWords.map((item: any) => decodeURIComponent(item.word));
      setWordCloudTags(newTags);
      setIsLastWordActive(true);
      setIsLastTwoWordsActive(false);
    } else if (count === 2 && !isLastTwoWordsActive) {
      const rhymeWords = await WordService.getTwoSyllableWordsWithSameRhyme(encodeURIComponent(lastTwoWords));
      const newTags = rhymeWords.map((item: any) => decodeURIComponent(item.word));
      setWordCloudTags(newTags);
      setIsLastTwoWordsActive(true);
      setIsLastWordActive(false);
    }
  };

  const handleUpdate = async () => {
    const user = localStorage.getItem('user');
    console.log(user);
    if (user && recordId) {
      const parsedRecordId = parseInt(recordId);
      const recordRequest = { title, content: text, username: JSON.parse(user).username };
      await UserService.updateUserRecord(user, parsedRecordId, recordRequest);
      message.success("Bản thảo cập nhật thành công.");
    }
  };

  const handleDelete = async () => {
    const user = localStorage.getItem('user');
    if (user && recordId) {
      try {
        const parsedRecordId = parseInt(recordId);
        await UserService.deleteUserRecord(user, parsedRecordId);
        message.success("Bản thảo đã được xóa thành công.");
        navigate('/records'); // Navigate to the records list page after deletion
      } catch (error) {
        console.error("Delete failed:", error);
        message.error("Xóa bản thảo thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <Components.GradientTitle 
          style={{ color: '#47B5FF', marginTop: '0px' }} 
          onClick={()=>{
            handleUpdate();
            navigate('/home');
          }}>RappA</Components.GradientTitle>
        <Components.GradiantButton
          style={{ padding: '20px', maxHeight: '40px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
          onClick={() => {
            handleUpdate();
            handleLogout();
            navigate('/login');
          }}
        >
          Đăng xuất
        </Components.GradiantButton>
      </StyledHeader>
      <MainContainer>
        <Card style={{ height: '100%', resize: 'none' }}>
          {selectedTag && <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#47B5FF' }}>Từ được chọn: {selectedTag}</div>}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 10,
          }}>
            <div style={{ width: 60 }}>Tiêu đề: </div>
            <TextArea value={title} onChange={handleTitleChange} style={{ width: '100%', height: 30 }}></TextArea>

          </div>
          <TextArea
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Text here..."
            style={{ height: "70vh" }}
          />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            marginTop: 10,
          }}>
            <Components.Button
              style={{ backgroundColor: '#02de9c', marginLeft: '5px', padding: '20px', maxHeight: '40px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
              onClick={() => {
                handleUpdate();
              }}
            >
              Lưu
            </Components.Button>
            <Components.Button
              style={{ backgroundColor: '#ff4d4f', marginLeft: '5px', padding: '20px', maxHeight: '40px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
              onClick={() =>{
                navigate('/home');
                handleDelete();
              }}
            >
              Xóa
            </Components.Button>
          </div>
        </Card>

        <Card>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <Title level={4} style={{ color: '#47B5FF' }}>
                Gợi ý vần
              </Title>
              <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Components.Button
                  style={{ backgroundColor: isLastWordActive ? '#47B5FF' : '#e6f7ff', color: isLastWordActive ? '#ffffff' : '#47B5FF' }}
                  onClick={() => { handleCreateTag(1); }}
                >
                  Tìm vần đơn
                </Components.Button>
                <Components.Button
                  style={{ backgroundColor: isLastTwoWordsActive ? '#47B5FF' : '#e6f7ff', color: isLastTwoWordsActive ? '#ffffff' : '#47B5FF' }}
                  onClick={() => { handleCreateTag(2); }}
                >
                  Tìm vần đôi
                </Components.Button>
              </Space>
              <div style={{
                marginTop: "10px",
                border: "1px solid #47B5FF",
                borderRadius: "8px",
                padding: "10px",
                maxHeight: "450px",
                overflow: "auto"
              }}>
                <WordCloud style={{ overflow: "auto", maxHeight: '70%' }}>
                  {wordCloudTags.map((tag, index) => (
                    (isLastWordActive && tag.split(' ').length === 1) ||
                      (isLastTwoWordsActive && tag.split(' ').length === 2) ? (
                      <Tag
                        key={index}
                        onClick={() => handleTagClick(tag)}
                        style={{
                          cursor: 'pointer',
                          fontSize: '16px',
                          margin: '4px',
                          backgroundColor: selectedTag === tag ? '#47B5FF' : '#e6f7ff',
                          color: selectedTag === tag ? '#ffffff' : '#47B5FF'
                        }}
                      >
                        {tag}
                      </Tag>
                    ) : null
                  ))}
                </WordCloud>
              </div>
            </div>
          </Space>
        </Card>
      </MainContainer>
    </StyledLayout>
  );
};

export default Record;