import React, { useState } from 'react';
import '../styles/Dashboard.css';
import Tables from './Tables';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('materialCode');
  const [searchResults, setSearchResults] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    materialCode: '',
    materialName: '',
    features: '',
    measure: '',
  });

  const [costOfMaterials, setCostOfMaterials] = useState(0);
  const [otherCosts, setOtherCosts] = useState(0);
  const [profitPerUnit, setProfitPerUnit] = useState(0);

  const [totalCostOfMaterials, setTotalCostOfMaterials] = useState(0);
  const [totalCostOfProduction, setTotalCostOfProduction] = useState(0);
  const [productPrice, setProductPrice] = useState(0);

  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showSearchResultsTab, setShowSearchResultsTab] = useState(false);

  const searchByMaterialCode = async (query) => {
    try {
      const response = await fetch(`http://localhost:3001/api/bom?materialCode=${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const handleSearch = async () => {
    const searchFunctions = {
      materialCode: searchByMaterialCode,
      // Add other search functions as needed
    };

    const selectedSearchFunction = searchFunctions[searchCriteria];
    const results = await selectedSearchFunction(searchQuery);
    setSearchResults(results);

    setShowSearchResultsTab(results.length > 0);
  };

  const handleAddMaterial = () => {
    // Implement your logic to add the 'newMaterial' to the database
    // For now, let's just log the new material data
    console.log('New Material:', newMaterial);
  };

  const handleCalculate = () => {
    // Implement your logic to calculate costs and prices based on user input
    // For now, let's just log the calculated values
    console.log('Calculating...');
    console.log('Cost of Materials:', costOfMaterials);
    console.log('Other Costs:', otherCosts);
    console.log('Profit Per Unit:', profitPerUnit);

    const calculatedTotalCostOfMaterials = costOfMaterials;
    const calculatedTotalCostOfProduction = costOfMaterials + otherCosts;
    const calculatedProductPrice = costOfMaterials + otherCosts + profitPerUnit;

    setTotalCostOfMaterials(calculatedTotalCostOfMaterials);
    setTotalCostOfProduction(calculatedTotalCostOfProduction);
    setProductPrice(calculatedProductPrice);
  };

  const handleUserInformationClick = () => {
    setShowUserDetails(!showUserDetails);
  };

  return (
    <div className="dashboard">
      {/* Left side: Account Details */}
      <div className="account-details">
        <h1>BILL OF MATERIALS DASHBOARD</h1>
        <p>Overview of Materials and Components</p>
        <div
          className="user-info"
          onClick={handleUserInformationClick}
          onMouseEnter={() => setShowUserDetails(true)}
          onMouseLeave={() => setShowUserDetails(false)}
        >
          <h2>User Information</h2>
          {showUserDetails && (
            <div className="user-details-box">
              <p>Name: John Doe</p>
              <p>Email: johndoe@example.com</p>
              <p>Role: User</p>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Boxes */}
      <div className="boxes">
        {/* Box 1: Search Box */}
        <div className="box">
          <h3>Search Box</h3>
          <div>
            <label>
              Search by:{' '}
              <select
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
              >
                <option value="materialCode">Material Code</option>
                {/* Add other options as needed */}
              </select>
            </label>
          </div>
          <input
            type="text"
            placeholder={`Search by ${searchCriteria === 'materialCode' ? 'Material Code' : 'Other Criteria'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          {/* Display search results here */}
          <ul>
            {searchResults.map(material => (
              <li key={material.materialCode}>
                {`${material.materialCode} - ${material.materialName}`}
              </li>
            ))}
          </ul>
        </div>

        {/* Box 5: Search Results Tab */}
        {showSearchResultsTab && (
          <div className="box">
            <h3>Search Results</h3>
            {/* Display search results in a tabular format */}
            <Tables searchResults={searchResults} />
          </div>
        )}

        {/* Box 2: Add New Material */}
        <div className="box">
          <h3>Add New Material</h3>
          <div className="input-group">
            <label>
              Material Code:
              <input
                type="text"
                value={newMaterial.materialCode}
                onChange={(e) => setNewMaterial({ ...newMaterial, materialCode: e.target.value })}
              />
            </label>
            <label>
              Material Name:
              <input
                type="text"
                value={newMaterial.materialName}
                onChange={(e) => setNewMaterial({ ...newMaterial, materialName: e.target.value })}
              />
            </label>
            <label>
              Features:
              <input
                type="text"
                value={newMaterial.features}
                onChange={(e) => setNewMaterial({ ...newMaterial, features: e.target.value })}
              />
            </label>
            <label>
              Measure:
              <input
                type="text"
                value={newMaterial.measure}
                onChange={(e) => setNewMaterial({ ...newMaterial, measure: e.target.value })}
              />
            </label>
          </div>
          <button onClick={handleAddMaterial}>Add Material</button>
        </div>

        {/* Box 3: Manual Calculation */}
        <div className="box">
          <h3>Manual Calculation</h3>
          <div className="input-group">
            <label>
              Cost of Materials:
              <input
                type="number"
                value={costOfMaterials}
                onChange={(e) => setCostOfMaterials(Number(e.target.value))}
              />
            </label>
            <label>
              Other Costs:
              <input
                type="number"
                value={otherCosts}
                onChange={(e) => setOtherCosts(Number(e.target.value))}
              />
            </label>
            <label>
              Profit Per Unit:
              <input
                type="number"
                value={profitPerUnit}
                onChange={(e) => setProfitPerUnit(Number(e.target.value))}
              />
            </label>
          </div>
          <button onClick={handleCalculate}>Calculate</button>
          <div className="calculation-results">
            <p>Total Cost of Materials: {totalCostOfMaterials}</p>
            <p>Total Cost of Production: {totalCostOfProduction}</p>
            <p>Product Price: {productPrice}</p>
          </div>
        </div>

        {/* Box 4: Recent Activity */}
        <div className="box">
          <h3>Recent Activity</h3>
          {/* Display recent activity logs here */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
