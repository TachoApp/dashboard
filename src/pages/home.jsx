import { Map } from "../components/private/map";

const HomePage = () => {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: '500px', height: '500px' }}>
          <Map />
        </div>
        <div style={{ width: '50%', height: '100%' }}>
          
        </div>
      </div>
    );
  };

export default HomePage