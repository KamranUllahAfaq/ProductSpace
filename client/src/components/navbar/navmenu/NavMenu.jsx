import { Button, Dropdown } from "antd";
import data from "../../../data/NavbarData.js";
import NavMenuItem from "./NavMenuItem.jsx";
import { useNavigate } from "react-router-dom";
const NavMenu = () => {
  const navigate = useNavigate();
  return (
    <div style={{ marginLeft: 10 }}>
      {data.map((item, index) => (
        <Dropdown
          key={index}
          placement="bottom"
          arrow={{
            pointAtCenter: true,
          }}
          dropdownRender={() => (
            <>
              {item.children &&
                item.children.map((child) => <NavMenuItem item={child} />)}
            </>
          )}
        >
          <Button
            size="large"
            type="text"
            onClick={() => {
              navigate(item.link);
            }}
          >
            {item.name}
          </Button>
        </Dropdown>
      ))}
    </div>
  );
};

export default NavMenu;
