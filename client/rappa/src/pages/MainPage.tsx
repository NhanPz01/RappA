import { Button, Card, Input, Layout, Space, Tag, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

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

const Logo = styled.div`
  color: #47B5FF;
  font-size: 24px;
  font-weight: bold;
`;

const MainContainer = styled(Content)`
  padding: 24px 50px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const WordCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const MainPage: React.FC = () => {
  return (
    <StyledLayout>
      <StyledHeader>
        <Logo>RappA</Logo>
        <Button type="primary" shape="round">
          Login
        </Button>
      </StyledHeader>

      <MainContainer>
        <Card style={{ height: '100%' }}>
          <TextArea
            placeholder="Text here..."
            style={{ height: 500, resize: 'none' }}
          />
        </Card>

        <Card>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            {/* Subject Section */}
            <div>
              <Title level={4} style={{ color: '#47B5FF' }}>
                Subject
              </Title>
              <div>History</div>
            </div>

            {/* Propose Section */}
            <div>
              <Title level={4} style={{ color: '#47B5FF' }}>
                Propose
              </Title>

              <div>
                <Title level={5}>Propose 1</Title>
                <WordCloud>
                  <Tag>word 1</Tag>
                  <Tag>word 2</Tag>
                  <Tag>word 3</Tag>
                  <Tag>word 4</Tag>
                </WordCloud>
              </div>

              <div>
                <Title level={5}>Propose 2</Title>
                <WordCloud>
                  <Tag>word 1</Tag>
                  <Tag>word 2</Tag>
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

export default MainPage;