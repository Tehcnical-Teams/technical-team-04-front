// src/App.js
import React, { useState } from 'react';

function App() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        university: '',
        experienceLevel: '',
        preferredLanguage: '',
        teamMembers: '',
        comments: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           const response = await fetch('https://technical-team-04-back.onrender.com/registrations',  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: formData.fullName,
                    email: formData.email,
                    phone_number: formData.phoneNumber,
                    university: formData.university,
                    experience_level: formData.experienceLevel,
                    preferred_language: formData.preferredLanguage,
                    team_members: formData.teamMembers,
                    comments: formData.comments,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Backend response:', result);
                alert('Registration successful! Thank you.');

                setFormData({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    university: '',
                    experienceLevel: '',
                    preferredLanguage: '',
                    teamMembers: '',
                    comments: '',
                });
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            alert('Could not connect to the server. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h2>Bug Fixed Workshop Registration</h2>
            <p className="form-description">
                Join us to hone your debugging skills in a fun and challenging environment!
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email address"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="e.g., +201XXXXXXXXX"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="university">University/Company</label>
                    <input
                        type="text"
                        id="university"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        placeholder="e.g., Cairo University, XYZ Company"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="experienceLevel">Experience Level *</label>
                    <select
                        id="experienceLevel"
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select your experience level</option>
                        <option value="beginner">Beginner Developer</option>
                        <option value="intermediate">Intermediate Developer</option>
                        <option value="advanced">Advanced Developer</option>
                        <option value="student">Computer Science Student</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Preferred Programming Language *</label>
                    <div className="radio-group">
                        {['python', 'javascript', 'java', 'cpp', 'csharp', 'other'].map((lang) => (
                            <span key={lang}>
                                <input
                                    type="radio"
                                    id={lang}
                                    name="preferredLanguage"
                                    value={lang}
                                    checked={formData.preferredLanguage === lang}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor={lang}>
                                    {lang === 'cpp' ? 'C++' : lang === 'csharp' ? 'C#' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                                </label>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="teamMembers">Team Members</label>
                    <textarea
                        id="teamMembers"
                        name="teamMembers"
                        rows="4"
                        value={formData.teamMembers}
                        onChange={handleChange}
                        placeholder="List full names and emails of your 1-3 team members..."
                    ></textarea>
                    <p className="note">Teams are 2-4 individuals. Leave blank if you're registering alone.</p>
                </div>

                <div className="form-group">
                    <label htmlFor="comments">Additional Comments</label>
                    <textarea
                        id="comments"
                        name="comments"
                        rows="3"
                        value={formData.comments}
                        onChange={handleChange}
                        placeholder="Any special needs or questions?"
                    ></textarea>
                </div>

                <button type="submit">Register Now</button>
            </form>
        </div>
    );
}

export default App;
