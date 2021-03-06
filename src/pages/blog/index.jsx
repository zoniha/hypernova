import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout, Row, Col } from 'antd';
import '@fontsource/overpass';
import '@fontsource/noto-sans-jp';

import { Header, SidebarWrapper, PostCard, SEO, BackTop } from '../../components/index';

const Blog = ({ data }) => (
  <Layout className="outerPadding background">
    <Layout className="container">
      <Header />
      <SEO title="Blog" description="zoniha's blog" path="blog" />
      <SidebarWrapper>
        <div className="marginTopTitle">
          <h1 className="titleSeparate">Blog</h1>
        </div>
        <Row gutter={[20, 20]}>
          {data.allMarkdownRemark &&
            data.allMarkdownRemark.edges.map((val, key) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col key={key} xs={24} sm={24} md={12} lg={8}>
                <PostCard data={val} />
              </Col>
            ))}
        </Row>
      </SidebarWrapper>
    </Layout>
    <BackTop showBelow={200} />
  </Layout>
);

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/index.md$/" } }
    ) {
      edges {
        node {
          frontmatter {
            date
            path
            title
            tags
            excerpt
            emoji
          }
        }
      }
    }
  }
`;

export default Blog;
