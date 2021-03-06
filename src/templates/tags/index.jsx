/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout, Row, Col } from 'antd';

import { SEO, Header, PostCard, SidebarWrapper, BackTop } from '../../components/index';
import Utils from '../../utils/pageUtils';
import Config from '../../../config';

import * as style from './tags.module.less';

const TagPage = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const tagName = Config.tags[tag].name || Utils.capitalize(tag);
  const tagPagePath = Config.pages.tag;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout className="outerPadding background">
      <Layout className="container">
        <Header />
        <SEO
          title={tagName}
          description={`All articles about ${tagName}.  ${Config.tags[tag].description} `}
          path={Utils.resolvePageUrl(tagPagePath, tag)}
          keywords={[tagName]}
        />
        <SidebarWrapper>
          <div className={`marginTopTitle ${style.tagsList}`}>
            <h1 className="titleSeparate">#{tagName}</h1>
          </div>
          <Row gutter={[20, 20]}>
            {posts.map((post, key) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col key={key} xs={24} sm={24} md={12} lg={8}>
                <PostCard data={post} />
              </Col>
            ))}
          </Row>
        </SidebarWrapper>
      </Layout>
      <BackTop showBelow={200} />
    </Layout>
  );
};

TagPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object.isRequired,
            }).isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query ($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } }, fileAbsolutePath: { regex: "/index.md$/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`;

export default TagPage;
