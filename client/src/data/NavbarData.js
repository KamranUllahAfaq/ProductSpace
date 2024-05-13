import {
  BookOutlined,
  PlayCircleOutlined,
  DropboxOutlined,
  GlobalOutlined,
  WechatOutlined,
  HighlightOutlined,
  NotificationOutlined,
  ToolOutlined,
} from "@ant-design/icons";

const data = [
  {
    name: "Products",
    link: `/`,
    children: [
      {
        name: "Topics",
        headline: "Browse Products through Topics",
        icon: <BookOutlined style={{ fontSize: 25 }} />,
        link: `/topics`,
      },
      {
        name: "New Products",
        headline: "Browse Newly Launched Products",
        icon: <PlayCircleOutlined style={{ fontSize: 25 }} />,
        link: `/newproducts`,
      },
      {
        name: "Collections",
        headline: "Product Curated By Community",
        icon: <DropboxOutlined style={{ fontSize: 25 }} />,
        link: `/collections`,
      },
      {
        name: "Web3.0",
        headline: "Keep upto date with web3.0",
        icon: <GlobalOutlined style={{ fontSize: 25 }} />,
        link: `/products/Web3`,
      },
    ],
  },
  {
    name: "Community",
    link: `/community/discussions`,
    children: [
      {
        name: "Discussions",
        headline: "Ask questions find and ask",
        icon: <WechatOutlined style={{ fontSize: 25 }} />,
        link: `/community/discussions`,
      },
      {
        name: "Stories",
        headline: "Tech News and Stories from world",
        icon: <HighlightOutlined style={{ fontSize: 25 }} />,
        link: `/community/stories`,
      },
      {
        name: "Events",
        headline: "Check out latest events",
        icon: <NotificationOutlined style={{ fontSize: 25 }} />,
        link: `/community/events`,
      },
    ],
  },
  {
    name: "Jobs",
    link: `/jobs`,
  },
  {
    name: "Newsletter",
    link: `/newsletter`,
  },
  {
    name: "Ambassador Program",
    link: `/ambassadorprogram`,
  },
  {
    name: "Tools",
    link: `/tools/products`,
    children: [
      {
        name: "Product Tools",
        headline: "View Product Stats",
        icon: <ToolOutlined style={{ fontSize: 25 }} />,
        link: `/tools/products`,
      },
      {
        name: "Ambassador Tools",
        headline: "View Ambassador Tools",
        icon: <ToolOutlined style={{ fontSize: 25 }} />,
        link: `/tools/ambassador`,
      },
      {
        name: "Launch Guide",
        headline: "View Launch Guide",
        icon: <ToolOutlined style={{ fontSize: 25 }} />,
        link: `/guide`,
      },
    ],
  },
];

export default data;
