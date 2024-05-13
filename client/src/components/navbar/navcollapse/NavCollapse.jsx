import { Button } from "antd";
import data from "../../../data/NavbarData.js";
import NavMenuItem from "../navmenu/NavMenuItem.jsx";
import { useNavigate } from "react-router-dom";
const NavCollapse = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginLeft: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {data.map((item) => (
        <>
          <Button
            onClick={() => {
              navigate(item.link);
            }}
            type="text"
            size="large"
            style={{ width: "100%", textAlign: "left" }}
          >
            {item.name}
          </Button>
          <div style={{ marginLeft: 6 }}>
            {item.children &&
              item.children.map((child) => <NavMenuItem item={child} />)}
          </div>
        </>
      ))}
    </div>
  );
};

export default NavCollapse;
