import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography.Title>Hello</Typography.Title>
      <Typography.Text>
        I'm an AI that will guide you through the EB2-NIW visa process. I need to know more about you so that I can
        provide all the information your need. Click the button bellow to start a new chat with me.
      </Typography.Text>
      <Link to="/new">
        <Button>Start a new form</Button>
      </Link>
    </div>
  );
}
export default Home;
