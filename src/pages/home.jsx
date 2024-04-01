import { Map } from "../components/private/map";
import { ChatMain } from "../components/private/chats/main";

const HomePage = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{marginRight: 15}}>
        <Map />
      </div>
      <div style={{width: "52vw"}}>
        <ChatMain />
      </div>
    </div>
  );
};

export default HomePage;
