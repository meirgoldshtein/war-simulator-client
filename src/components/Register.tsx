import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { fetchOrganizations } from '../redux/slices/organinationSlice';
import { fetchRegister } from '../redux/slices/userSlice';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [organizationID, setOrganizationID] = useState('');
    const [role, setRole] = useState('IDF');
    const [filteredOrganizations, setFilteredOrganizations] = useState([]);
    const organizations = useSelector((state: any) => state.organizations).organizations
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchOrganizations());
    }, [])

    useEffect(() => {
      setFilteredOrganizations(
        organizations.filter((org: any) => {
          if (role === "IDF" && org.name.split(" ")[0] === role) {
            return true;
          }
          if (role === "TERRORIST-ORGANIZATIONS" && org.name.split(" ")[0] != "IDF") {
            return true;
          }
          return false;
        })
      );
    }, [organizations, role])

    const handleSubmit = () => {
      if(!username || !password || !organizationID){
        alert("Please fill all the fields")
        return
      } 

      dispatch(fetchRegister({ username, password, orgId:organizationID}));
    }
  return (
    <div className='register'>
      <h1>Register</h1>
      <label htmlFor="">What are you most attracted to?</label>
      <select name="" id="" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="IDF">IDF</option>
        <option value="TERRORIST-ORGANIZATIONS">Im a terrorist</option>
      </select>

      <label htmlFor="">Organization</label>
      {filteredOrganizations && filteredOrganizations.length > 0 ? (
        <select name="" id="" value={organizationID} onChange={(e) => setOrganizationID(e.target.value)}>
          {filteredOrganizations.map((organization: any) => (
            <option key={organization._id} value={organization._id}>{organization.name}</option>
          ))}
        </select>
      ) : (
        <p>Loading organizations...</p>
      )}
      <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Confirm</button>
      <Link to='/login'>Already have an account? connect</Link>
    </div>
    )
}