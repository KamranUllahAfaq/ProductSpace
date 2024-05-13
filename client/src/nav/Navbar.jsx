import React, { useState } from "react";
import { Space, Drawer, Avatar, Modal, Button, Dropdown, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../state";
import { useNavigate } from "react-router-dom";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import NavMenu from "../components/navbar/navmenu/NavMenu";
import SignUpModal from "../components/signup/SignUpModal";
import "./navbar.css";
import SignInModal from "../components/signup/SignInModal";
import NavCollapse from "../components/navbar/navcollapse/NavCollapse";

const items = [
  {
    label: "Profile",
    key: "/profile",
  },
  {
    label: "My Products",
    key: "/myproducts",
  },
];
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <div>
      <div className="mobile">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setVisible(!visible)}
          />
          <Drawer
            placement="left"
            closable={false}
            onClose={() => {
              setVisible(false);
            }}
            open={visible}
          >
            <NavCollapse />
          </Drawer>

          <Avatar size={50} shape="square" src="/logo mini.png" />
          {user ? <ProfileAvatar /> : <SignInButtons />}
        </div>
      </div>
      <div className="web">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar size={50} shape="square" src="/logo mini.png" />

            <NavMenu />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {user ? <ProfileAvatar /> : <SignInButtons />}
          </div>
        </div>
      </div>
    </div>
  );
};

const SignInButtons = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  return (
    <div>
      <Space>
        <Button
          type="text"
          shape="round"
          onClick={() => {
            setSignInOpen(true);
          }}
        >
          Signin
        </Button>
      </Space>
      <Modal
        centered
        open={signInOpen}
        onOk={() => setSignInOpen(false)}
        onCancel={() => setSignInOpen(false)}
        footer={null}
      >
        <SignInModal
          setSignInOpen={setSignInOpen}
          setSignUpOpen={setSignUpOpen}
        />
      </Modal>
      <Space>
        <Button
          type="primary"
          shape="round"
          onClick={() => {
            setSignUpOpen(true);
          }}
        >
          Sign up
        </Button>
      </Space>

      <Modal
        centered
        open={signUpOpen}
        onOk={() => setSignUpOpen(false)}
        onCancel={() => setSignUpOpen(false)}
        footer={null}
      >
        <SignUpModal
          setSignInOpen={setSignInOpen}
          setSignUpOpen={setSignUpOpen}
        />
      </Modal>
    </div>
  );
};

const ProfileAvatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    await dispatch(authActions.logout());
    navigate("/");
    window.location.reload(false);
  };
  const onClick = ({ key }) => {
    navigate(key);
  };
  return (
    <div>
      <Button
        type="text"
        size="large"
        onClick={() => {
          navigate("/addProductDetials");
        }}
      >
        Submit
      </Button>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
        dropdownRender={(menu) => (
          <div
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
            }}
          >
            {React.cloneElement(menu, {
              style: {
                boxShadow: "none",
              },
            })}
            <Divider
              style={{
                margin: 0,
              }}
            />
            <Space
              style={{
                padding: 8,
              }}
            >
              <Button type="link" onClick={handleLogout}>
                Logout
              </Button>
            </Space>
          </div>
        )}
      >
        {user.image ? (
          <Avatar src={user.image} size={50} />
        ) : (
          <Avatar size={50} icon={<UserOutlined />} />
        )}
      </Dropdown>
    </div>
  );
};

export default Navbar;
