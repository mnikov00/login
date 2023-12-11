import React from 'react';
import '../styles/Tables.css';

function Tables({ searchResults }) {
  return (
    <div>
      <h1>Tables</h1>
      <table>
        <thead>
          <tr>
            <th>Material Code</th>
            <th>Material Name</th>
            {/* Add additional columns based on your data structure */}
          </tr>
        </thead>
        <tbody>
          {searchResults.map(material => (
            <tr key={material.materialCode}>
              <td>{material.materialCode}</td>
              <td>{material.materialName}</td>
              {/* Add additional cells based on your data structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
