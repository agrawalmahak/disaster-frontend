import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    disaster_name: '',
    custom_disaster_name: '',
    location: '',
    description: '',
  });

  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    const fetchDisasters = async () => {
      const { data, error } = await supabase.from('disasters').select('name');
      if (data) setDisasters(data);
      if (error) console.error('Error fetching disasters:', error);
    };

    fetchDisasters();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalDisasterName =
      formData.disaster_name === 'Other' ? formData.custom_disaster_name : formData.disaster_name;

    const { data, error } = await supabase.from('reports').insert([
      {
        disaster_name: finalDisasterName,
        location: formData.location,
        description: formData.description,
      },
    ]);

    if (error) {
      alert('Error submitting report');
      console.error(error);
    } else {
      alert('Report submitted successfully!');
      setFormData({
        disaster_name: '',
        custom_disaster_name: '',
        location: '',
        description: '',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold">Submit Disaster Report</h2>

      {/* Disaster Dropdown */}
      <div>
        <label className="block font-medium">Disaster</label>
        <select
          name="disaster_name"
          value={formData.disaster_name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Disaster --</option>
          {disasters.map((d, index) => (
            <option key={index} value={d.name}>
              {d.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Show Custom Disaster Input if "Other" is selected */}
      {formData.disaster_name === 'Other' && (
        <div>
          <label className="block font-medium">Custom Disaster Name</label>
          <input
            type="text"
            name="custom_disaster_name"
            value={formData.custom_disaster_name}
            onChange={handleChange}
            placeholder="Enter disaster name"
            required
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {/* Location Input */}
      <div>
        <label className="block font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the situation"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit Report
      </button>
    </form>
  );
};

export default ReportForm;
