import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import { Layout } from "antd";
import Navbar from "./nav/Navbar";
import EditProfile from "./screens/EditProfile";
import SubmitProduct from "./screens/SubmitProduct";
import AddProductDetails from "./screens/AddProductDetails";
import MyProducts from "./screens/MyProducts";
import JobPostings from "./screens/Jobs/JobPostings";
import PostNewJob from "./screens/Jobs/PostNewJob";
import AmbassadorApply from "./screens/Ambassador/AmbassadorApply";
import Applications from "./screens/Ambassador/Applications";
import AmbassadorProducts from "./screens/Ambassador/AmbassadorProducts";
import ProductDetailsScreen from "./screens/ProductDetails/ProductDetailsScreen";
import ProductsByTopics from "./screens/ProductsByTopic";
import Topics from "./screens/Topics/Topics";
import DiscussionsPage from "./screens/Discussions/DiscussionsPage/DiscussionsPage";
import AddDiscussions from "./screens/Discussions/AddDiscussions/AddDiscussions";
import DiscussionDetailsScreen from "./screens/Discussions/DiscussionDetails/DiscussionDetailsScreen";
import UserProfile from "./screens/UserProfile";
import Newsletter from "./screens/Newsletter/Newsletter";
import Tools from "./screens/Tools/Tools";
import MyJobsPosted from "./screens/Jobs/MyJobsPosted";
import JobCandidates from "./screens/Jobs/JobCandidates";
import CandidateApply from "./screens/Jobs/CandidateApply/CandidateApply";
import { useSelector } from "react-redux";
import PrivateRoute from "./navigation/PrivateRoute";
import Login from "./screens/Login/Login";
import ErrorScreen from "./screens/ErrorScreen/ErrorScreen";
import EventsScreen from "./screens/Events/EventsScreen/EventsScreen";
import StoriesScreen from "./screens/Stories/StoriesScreen/StoriesScreen";
import AddStory from "./screens/Stories/AddStory/AddStory";
import StoryDetails from "./screens/Stories/StoryDetails/StoryDetails";
import MyStories from "./screens/Stories/MyStories/MyStories";
import Collections from "./screens/Collections/Collections";
import AmbassadorTools from "./screens/Tools/AmbassadorTools";
import ProductTools from "./screens/Tools/ProductTools";
import MyProductsTools from "./screens/Tools/MyProductsTools";
import MyAmbassadors from "./screens/Tools/MyAmbassadors";
import LaunchGuide from "./screens/LaunchGuide/LaunchGuide";
import AddEvent from "./screens/Events/AddEvent/AddEvent";
import EventDetails from "./screens/Events/EventDetails/EventDetails";
import NewProducts from "./components/products/NewProducts";
import MyCollections from "./screens/Collections/MyCollections";
import AddCollection from "./screens/Collections/AddCollection";
import CollectionDetails from "./screens/Collections/CollectionDetails";
import MyEvents from "./screens/Events/MyEvents";
const { Header } = Layout;

const headerStyle = {
  height: 75,
  lineHeight: "75px",
  backgroundColor: "#ffffff",
  paddingInline: 10,
  borderBottom: "1px solid lightgray",
};
function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <div className="App">
      <BrowserRouter>
        <Layout style={{ backgroundColor: "white" }}>
          <Header style={headerStyle}>
            <Navbar />
          </Header>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Newsletter />} path="/newsletter" />
            <Route element={<StoriesScreen />} path="/community/stories" />
            <Route element={<EventsScreen />} path="/community/events" />
            <Route element={<Collections />} path="/collections" />
            <Route element={<LaunchGuide />} path="/guide" />
            <Route element={<NewProducts />} path="/newproducts" />

            <Route element={<Tools />} path="/tools" />

            <Route element={<Topics />} path="/topics" />
            <Route element={<JobPostings />} path="/jobs" />
            <Route element={<ProductsByTopics />} path="/products/:topic" />

            <Route
              path="/profile/:id"
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={UserProfile}
                />
              }
            />
            <Route
              path="/community/events/myevents"
              element={
                <PrivateRoute isAuthenticated={isLoggedIn} element={MyEvents} />
              }
            />
            <Route
              path="/collections/my"
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={MyCollections}
                />
              }
            />
            <Route
              path="/collection/details/:id"
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={CollectionDetails}
                />
              }
            />
            <Route
              path="/collections/add"
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={AddCollection}
                />
              }
            />
            <Route
              path="/tools/products"
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={MyProductsTools}
                />
              }
            />
            <Route
              path="/tools/product/:id"
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={ProductTools}
                />
              }
            />
            <Route
              path="/tools/ambassador"
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={MyAmbassadors}
                />
              }
            />
            <Route
              path="/tools/ambassador/:id"
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={AmbassadorTools}
                />
              }
            />
            <Route
              path="/events/new"
              element={
                <PrivateRoute isAuthenticated={isLoggedIn} element={AddEvent} />
              }
            />
            <Route
              path="/event/details/:id"
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={EventDetails}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute isAuthenticated={isLoggedIn} element={Profile} />
              }
            />

            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={EditProfile}
                />
              }
              path="/editprofile"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={MyProducts}
                />
              }
              path="/myProducts"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={MyJobsPosted}
                />
              }
              path="/jobs/myjobs"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={PostNewJob}
                />
              }
              path="/jobs/postjob"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={PostNewJob}
                />
              }
              path="/jobs/editJob/:id"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={JobCandidates}
                />
              }
              path="/jobs/candidates/:id"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={CandidateApply}
                />
              }
              path="/jobs/candidates/apply/:id"
            />

            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={SubmitProduct}
                />
              }
              path="/addProduct"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={AddProductDetails}
                />
              }
              path="/addProductDetials"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={AddProductDetails}
                />
              }
              path="/editproduct/:id"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={AmbassadorApply}
                />
              }
              path="/ambassador/apply/:id"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={AmbassadorProducts}
                />
              }
              path="/ambassadorprogram"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={Applications}
                />
              }
              path="/ambassador/applications"
            />
            <Route
              element={<DiscussionsPage />}
              path="/community/discussions"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={AddDiscussions}
                />
              }
              path="/community/discussions/new"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={DiscussionDetailsScreen}
                />
              }
              path="/discussion/details/:id"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={ProductDetailsScreen}
                />
              }
              path="/product/details/:id"
            />
            <Route
              element={
                <PrivateRoute isAuthenticated={isLoggedIn} element={AddStory} />
              }
              path="/stories/new"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={StoryDetails}
                />
              }
              path="/story/details/:id"
            />
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  element={MyStories}
                />
              }
              path="/stories/mystories"
            />

            <Route element={<ErrorScreen />} path="*" />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
