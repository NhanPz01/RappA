import { Button, Card, Input, Layout, Space, Tag, Typography, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as Components from '../assets/Components';
import WordService from '../services/WordService';
import { useNavigate } from 'react-router-dom';


const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

// Some minimal styled components for custom layouts
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
  padding: 24px 50px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin: 0 auto;
  width: 100vw;
`;

const WordCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Record: React.FC = () => {
  const [text, setText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag); // Set the selected tag
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText); // Update the state with the new text
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && selectedTag) {
      e.preventDefault(); // Prevent the default behavior of Enter key
      const currentLineStart = text.lastIndexOf('\n') + 1; // Start of the current line
      const currentLineEnd = text.indexOf('\n', currentLineStart); // End of the current line
      const currentLine = text.slice(currentLineStart, currentLineEnd === -1 ? undefined : currentLineEnd); // Get the current line
      // Append the tag to the end of the current line
      const updatedText = `${text.slice(0, currentLineStart)}${currentLine.trim()} ${selectedTag} ${text.slice(currentLineEnd)}`; // Append the tag to the current line
      setText(updatedText); // Update the state with the new text
      setSelectedTag(null); // Clear the selected tag
    }
  };

  const [isLastWordActive, setIsLastWordActive] = useState(false); // State for last word button
  const [isLastTwoWordsActive, setIsLastTwoWordsActive] = useState(false); // State for last two words button
  const [wordCloudTags, setWordCloudTags] = useState<string[]>([]); // State to store tags in the word cloud

  const handleCreateTag = async (count: number) => {
    const words = text.trim().split(' '); // Split the text into words
    const lastWords = words.slice(-count).join(' '); // Get the last 'count' words
    if (lastWords.trim() === '') {
      message.warning('No words available in the line above to create a tag.'); // Show warning message
      return; // Exit the function early
    }
    // Only add the tag if the button is active
    if (count === 1 && !isLastWordActive) {
      const rhymeWords = await WordService.getWordsWithSameRhyme(lastWords); // Fetch words with the same rhyme
      const newTags = rhymeWords.map((item: any) => item.word); // Extract 'word' from response
      setWordCloudTags(newTags); // Set new tags to word cloud
      setIsLastWordActive(true); // Activate last word button
      setIsLastTwoWordsActive(false); // Deactivate last two words button
    } else if (count === 2 && !isLastTwoWordsActive) {
      setWordCloudTags([lastWords]); // Set last two words tag
      setIsLastTwoWordsActive(true); // Activate last two words button
      setIsLastWordActive(false); // Deactivate last word button
    }
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <Components.Title style={{ color: '#47B5FF', marginTop: '0px' }}>RappA</Components.Title>
        <Components.Button
          style={{ padding: '20px', maxHeight: '40px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
          onClick={() => navigate('/login')}
        >
          Login
        </Components.Button>
      </StyledHeader>
      <MainContainer>
        <Card style={{ height: '100%' }}>
          {selectedTag && <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#47B5FF' }}>Từ được chọn: {selectedTag}</div>}
          <TextArea
            value={text}
            onChange={handleTextChange} // Use the updated handler
            onKeyDown={handleKeyDown} // Handle Enter key
            placeholder="Text here..."
            style={{ height: 500, resize: 'none' }}
          />
        </Card>

        <Card>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <Title level={4} style={{ color: '#47B5FF' }}>
                Propose
              </Title>
              <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Components.Button
                  style={{ backgroundColor: isLastWordActive ? '#47B5FF' : '#e6f7ff', color: isLastWordActive ? '#ffffff' : '#47B5FF' }}
                  onClick={() => { handleCreateTag(1); }}
                >
                  Create Tag (Last Word)
                </Components.Button>
                <Components.Button
                  style={{ backgroundColor: isLastTwoWordsActive ? '#47B5FF' : '#e6f7ff', color: isLastTwoWordsActive ? '#ffffff' : '#47B5FF' }}
                  onClick={() => { handleCreateTag(2); }}
                >
                  Create Tag (Last 2 Words)
                </Components.Button>
              </Space>
              <div style={{
                marginTop: "10px",
                border: "1px solid #47B5FF",
                borderRadius: "8px",
                padding: "10px",
                maxHeight: "450px",
                overflow: "auto" // Allow scrolling if content exceeds max height
              }}>
                <WordCloud style={{ overflow: "auto" }}>
                  {wordCloudTags.map((tag, index) => (
                    (isLastWordActive && tag.split(' ').length === 1) ||
                      (isLastTwoWordsActive && tag.split(' ').length === 2) ? (
                      <Tag
                        key={index}
                        onClick={() => handleTagClick(tag)}
                        style={{
                          cursor: 'pointer',
                          fontSize: '16px', // Increase font size
                          margin: '4px', // Add some margin between tags
                          backgroundColor: selectedTag === tag ? '#47B5FF' : '#e6f7ff', // Change color when selected
                          color: selectedTag === tag ? '#ffffff' : '#47B5FF' // Change text color when selected
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
      <Footer style={{ textAlign: 'center', background: '#47B5FF', color: 'white' }}>
        Copyright © RappA
      </Footer>
    </StyledLayout>
  );
};
export default Record;