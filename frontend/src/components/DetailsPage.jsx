import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from './common/Layout';
import PropDetails from './common/PropDetails';

function DetailsPage() {
  const { id } = useParams(); // Get the property ID from the URL
  return (
    <Layout>
      <PropDetails propertyId={id} /> {/* Pass the property ID */}
    </Layout>
  );
}

export default DetailsPage;
