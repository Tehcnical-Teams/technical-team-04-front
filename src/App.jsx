// src/App.js
import React, { useState } from 'react';
// If this component has its own styles in a separate file (e.g., App.css),
// you would import it here: import './App.css';
// Otherwise, rely on global styles imported in index.js (via index.css).

function App() {
    // State variables to hold form data
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

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => { // جعل الدالة async للتعامل مع الـ await
        e.preventDefault(); // منع سلوك إرسال النموذج الافتراضي

        try {
            // إرسال البيانات إلى الواجهة الخلفية لـ Node.js
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST', // نوع الطلب هو POST لإرسال البيانات
                headers: {
                    'Content-Type': 'application/json', // إخبار الخادم بأننا نرسل بيانات JSON
                },
                body: JSON.stringify(formData), // تحويل كائن formData إلى سلسلة JSON
            });

            // التحقق مما إذا كانت الاستجابة ناجحة (حالة 2xx)
            if (response.ok) {
                const result = await response.json(); // تحليل استجابة JSON من الواجهة الخلفية
                console.log('Backend response:', result);
                alert('Registration successful! Thank you.');
                
                // اختيارياً: مسح النموذج بعد الإرسال الناجح
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
                // إذا كانت الاستجابة غير ناجحة (مثل 400, 500)
                const errorData = await response.json(); // الحصول على تفاصيل الخطأ من الواجهة الخلفية
                console.error('Registration failed:', errorData);
                alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            // التعامل مع أخطاء الشبكة أو الأخطاء التي تحدث قبل الوصول إلى الخادم
            console.error('There was an error submitting the form:', error);
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
                    <label htmlFor="fullName">Full Name <span className="required-star">*</span></label>
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
                    <label htmlFor="email">Email Address <span className="required-star">*</span></label>
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
                    <label htmlFor="university">University/Company (Optional)</label>
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
                    <label htmlFor="experienceLevel">Experience Level <span className="required-star">*</span></label>
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
                    <label>Preferred Programming Language(s) for Challenges <span className="required-star">*</span></label>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="python"
                            name="preferredLanguage"
                            value="python"
                            checked={formData.preferredLanguage === 'python'}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="python">Python</label>

                        <input
                            type="radio"
                            id="javascript"
                            name="preferredLanguage"
                            value="javascript"
                            checked={formData.preferredLanguage === 'javascript'}
                            onChange={handleChange}
                        />
                        <label htmlFor="javascript">JavaScript</label>

                        <input
                            type="radio"
                            id="java"
                            name="preferredLanguage"
                            value="java"
                            checked={formData.preferredLanguage === 'java'}
                            onChange={handleChange}
                        />
                        <label htmlFor="java">Java</label>

                        <input
                            type="radio"
                            id="cpp"
                            name="preferredLanguage"
                            value="cpp"
                            checked={formData.preferredLanguage === 'cpp'}
                            onChange={handleChange}
                        />
                        <label htmlFor="cpp">C++</label>

                        <input
                            type="radio"
                            id="csharp"
                            name="preferredLanguage"
                            value="csharp"
                            checked={formData.preferredLanguage === 'csharp'}
                            onChange={handleChange}
                        />
                        <label htmlFor="csharp">C#</label>

                        <input
                            type="radio"
                            id="otherLang"
                            name="preferredLanguage"
                            value="other"
                            checked={formData.preferredLanguage === 'other'}
                            onChange={handleChange}
                        />
                        <label htmlFor="otherLang">Other (specify in notes)</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="teamMembers">Team Members (if registering as a team)</label>
                    <textarea
                        id="teamMembers"
                        name="teamMembers"
                        rows="4"
                        value={formData.teamMembers}
                        onChange={handleChange}
                        placeholder="List full names and emails of your 1-3 team members (e.g., John Doe - john@example.com, Jane Smith - jane@example.com). If you don't have a team, leave blank."
                    ></textarea>
                    <p className="note">Teams are 2-4 individuals. If you don't have a full team, we can help you find one!</p>
                </div>

                <div className="form-group">
                    <label htmlFor="comments">Anything else we should know?</label>
                    <textarea
                        id="comments"
                        name="comments"
                        rows="3"
                        value={formData.comments}
                        onChange={handleChange}
                        placeholder="e.g., specific accessibility needs, questions, or if you prefer to be placed in a team."
                    ></textarea>
                </div>

                <button type="submit">Register Now</button>
            </form>
        </div>
    );
}

export default App;