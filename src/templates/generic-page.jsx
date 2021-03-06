import { graphql } from 'gatsby';
import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
import Layout from '../components/layout';
import SEO from '../components/seo';

const classes = {
  wrapper: 'mt-16 blog-content',
};

const GenericPage = ({ data }) => {
  const page = data.markdownRemark;

  return (
    <Layout>
      <Header
        metadata={data.site.siteMetadata}
        pageContext="{locale: language}"
      />
      <SEO title={page.frontmatter.title} />
      <main className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white z-0">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:py-10 sm:px-6 lg:px-8">
          <div className="frontmatter mb-8 text-center">
            <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl sm:leading-none">
              {page.frontmatter.title}
            </h2>
          </div>

          <hr className="mx-auto" />

          <div className="prose mx-auto dark-mode:prose-dark dark:text-gray-300">
            <div
              className={classes.wrapper}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </div>
      </main>
      <Footer pageContext="{locale: language}" />
    </Layout>
  );
};

export default GenericPage;

export const pageQuery = graphql`
  query GenericPageBySlug($slug: String!) {
    site {
      siteMetadata {
        name
        title
        description
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        keywords
      }
    }
  }
`;
