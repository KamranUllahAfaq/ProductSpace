import { useState, useEffect } from "react";
import {
  Layout,
  Space,
  Menu,
  Input,
  Avatar,
  Button,
  Dropdown,
  Divider,
  Row,
  Col,
  Typography,
  Select,
  Card,
} from "antd";
import { RetweetOutlined, SearchOutlined } from "@ant-design/icons";
import ProductCard from "../components/products/productcard/ProductCard";
import MakersCard from "../components/products/makerscard/MakersCard";
import JobCard from "../components/products/jobcard/JobCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const REST_API_ENDPOINT = process.env.REACT_APP_API;
const { Header, Footer, Sider, Content } = Layout;

const contentStyle = {
  paddingInline: "10%",
  paddingTop: 30,
  background:
    "linear-gradient(90deg, rgba(244,244,244,1) 0%, rgba(231,238,246,1) 51%, rgba(255,255,255,1) 100%)",
  minHeight: "100vh",
};

const footerStyle = {
  textAlign: "center",
  backgroundColor: "white",
};

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [featuredUsers, setFeaturedUsers] = useState([]);
  const [selectUser, setSelectUser] = useState(0);
  const [allJobs, setAllJobs] = useState([]);
  const [selectJob, setSelectJob] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const loadMoreUsers = async () => {
    if (allUsers.length > selectUser + 3) {
      setFeaturedUsers(allUsers.slice(selectUser + 3, selectUser + 6));
      setSelectUser(selectUser + 3);
    }
  };
  const loadMoreJobs = async () => {
    navigate("/jobs");
  };
  const fetchAllJobs = async () => {
    try {
      await axios.get(`${REST_API_ENDPOINT}job`).then((res) => {
        console.log(res.data);
        setAllJobs(res.data);
        setFeaturedJobs(res.data.slice(selectJob, selectJob + 3));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      await axios.get(`${REST_API_ENDPOINT}user`).then((res) => {
        setAllUsers(res.data);
        setFeaturedUsers(res.data.slice(selectUser, selectUser + 3));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios.get(`${REST_API_ENDPOINT}product`).then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterProducts = (value) => {
    setSearch(value);

    const filteredProducts = products.filter((product) => {
      return product.name.includes(value);
    });
    setFilteredProducts(filteredProducts);
    if (value === "") {
      setFilteredProducts(products);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchAllProducts();
    fetchAllUsers();
    fetchAllJobs();
    setLoading(false);
  }, [refresh]);

  return (
    <div>
      <Content style={contentStyle}>
        <div></div>
        {/* Header Card */}

        <Row>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <div>
              <div>
                <Card
                  size="small"
                  title="Which App Do you use the most on your phone?"
                  extra={<RetweetOutlined />}
                  style={{
                    width: "100%",
                    padding: "2%",
                    background:
                      "linear-gradient(90deg, rgba(226,176,206,0.2) 0%, rgba(194,180,217,0.2) 53%, rgba(238,174,202,0.2) 100%)",
                  }}
                >
                  <Input
                    size="large"
                    placeholder="Search Products"
                    prefix={<SearchOutlined />}
                    value={search}
                    onChange={(event) => {
                      filterProducts(event.target.value);
                    }}
                  />
                </Card>
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Text style={{ fontWeight: "bold", fontSize: 26 }}>
                Today's {moment(Date.now()).format("dddd")}
              </Typography.Text>
              <Select
                defaultValue="Newest"
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: "featured",
                    label: "Featured",
                  },
                  {
                    value: "newest",
                    label: "Newest",
                  },
                ]}
              />
            </div>
            <div>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              ))}
            </div>
          </Col>
          <Col xs={24} sm={24} offset={1} md={24} lg={7} xl={7}>
            {/* Featured Makers */}
            <div>
              <Typography.Text>FEATURED MAKERS</Typography.Text>
              <div style={{ marginTop: 30 }}>
                {featuredUsers.map((user, index) => (
                  <MakersCard key={index} user={user} />
                ))}
                {/* <MakersCard />
                <MakersCard /> */}
              </div>
              <div>
                <Button
                  onClick={loadMoreUsers}
                  style={{ width: "100%", height: 50 }}
                >
                  Show More Makers
                </Button>
              </div>
            </div>
            <Divider />
            {/* Featured Jobs */}
            <div>
              <Typography.Text>FEATURED JOBS</Typography.Text>
              <div style={{ marginTop: 30 }}>
                {featuredJobs.map((job, index) => (
                  <JobCard job={job} key={index} />
                ))}
                {/* <JobCard />
                <JobCard /> */}
              </div>
              <div>
                <Button
                  onClick={loadMoreJobs}
                  style={{ width: "100%", height: 50 }}
                >
                  Show More Jobs
                </Button>
              </div>
              <div>
                <Typography.Text style={{ fontSize: 14 }}>
                  Hiring?
                </Typography.Text>
                <Button
                  type="link"
                  onClick={() => {
                    navigate("/jobs/postjob");
                  }}
                >
                  Post a Job?
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </div>
  );
};
export default Home;
