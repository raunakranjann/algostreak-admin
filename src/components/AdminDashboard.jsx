import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
// Added query, orderBy, and limit for Firebase optimization
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, limit } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  
  // Dashboard State
  const [activeTab, setActiveTab] = useState('questions'); 
  const [usersList, setUsersList] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [dayNumber, setDayNumber] = useState('');
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [theory, setTheory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Data from Firestore
  const fetchData = async () => {
    setLoadingData(true);
    try {
      if (activeTab === 'users') {
        
        // --- FIREBASE OPTIMIZATION: Only fetch the 50 most recent users! ---
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("lastLogin", "desc"), limit(50)); 
        
        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Note: We don't need manual javascript sorting anymore because orderBy handled it!
        setUsersList(usersData);
        
      } else if (activeTab === 'questions') {
        const querySnapshot = await getDocs(collection(db, "questions"));
        const qData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Sort by dayNumber
        qData.sort((a, b) => (a.dayNumber || 0) - (b.dayNumber || 0));
        setQuestionsList(qData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  // EDIT BUTTON: Auto-fills the form with the selected question's data
  const openEditForm = (q) => {
    setEditingId(q.id);
    setDayNumber(q.dayNumber || ''); 
    setTopic(q.topic || ''); 
    setTitle(q.title || ''); 
    setDescription(q.description || '');
    setTheory(q.theory || '');
    setShowForm(true);
  };

  // ADD BUTTON: Clears the form for a fresh entry
  const openAddForm = () => {
    setEditingId(null);
    setDayNumber(''); setTopic(''); setTitle(''); setDescription(''); setTheory('');
    setShowForm(true);
  };

  // SAVE BUTTON: Handles both Add (New) and Edit (Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        dayNumber: parseInt(dayNumber), 
        topic: topic.trim(), 
        title: title.trim(), 
        description: description.trim(),
        theory: theory.trim()
      };

      if (editingId) {
        await updateDoc(doc(db, "questions", editingId), payload);
      } else {
        await addDoc(collection(db, "questions"), payload);
      }
      
      setShowForm(false);
      fetchData(); // Refresh the list instantly
    } catch (err) {
      console.error(err);
      alert("Action failed. Check Firebase Rules.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE BUTTON: Removes the document from Firestore
  const handleDelete = async (id) => {
    if (window.confirm("Delete this question forever?")) {
      await deleteDoc(doc(db, "questions", id));
      fetchData(); // Refresh the list instantly
    }
  };

  const formatDate = (dateData) => {
    if (!dateData) return "Never";
    if (typeof dateData === 'string') return dateData;
    if (dateData.toDate) {
      return dateData.toDate().toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', 
        hour: 'numeric', minute: '2-digit'
      });
    }
    return new Date(dateData).toLocaleDateString();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>System Management Console</h2>
          <small style={styles.userEmail}>{user.email}</small>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>Disconnect</button>
      </div>

      <div style={styles.tabsContainer}>
        <button style={activeTab === 'users' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('users')}>👥 User Database</button>
        <button style={activeTab === 'questions' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('questions')}>📚 DSA Questions</button>
      </div>

      <div style={styles.card}>
        {loadingData ? (
          <p style={{ textAlign: 'center', padding: '40px' }}>Syncing with Database...</p>
        ) : (
          <>
            {/* USERS VIEW */}
            {activeTab === 'users' && (
              <div>
                <h3 style={styles.sectionTitle}>Recent Users</h3>
                {usersList.length === 0 ? (
                  <p>No users found yet.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>Name</th>
                          <th style={styles.th}>User Email</th>
                          <th style={styles.th}>Current Streak</th>
                          <th style={styles.th}>Last Seen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersList.map((u) => (
                          <tr key={u.id} style={styles.tr}>
                            <td style={styles.td}><strong>{u.name || "Unknown"}</strong></td>
                            <td style={styles.td}>{u.email || u.id}</td>
                            <td style={styles.td}><span style={styles.streakBadge}>🔥 {u.streak || 0} Days</span></td>
                            <td style={styles.td}><small>{formatDate(u.lastLogin)}</small></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* QUESTIONS VIEW */}
            {activeTab === 'questions' && !showForm && (
              <div>
                <div style={styles.flexBetween}>
                  <h3 style={styles.sectionTitle}>Question Repository ({questionsList.length})</h3>
                  <button onClick={openAddForm} style={styles.addBtn}>+ Add Question</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Day</th>
                        <th style={styles.th}>Topic</th>
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionsList.map((q) => (
                        <tr key={q.id} style={styles.tr}>
                          <td style={styles.td}>Day {q.dayNumber}</td>
                          <td style={styles.td}>{q.topic}</td>
                          <td style={styles.td}><strong>{q.title}</strong></td>
                          <td style={styles.td}><small>{q.description}</small></td>
                          <td style={styles.td}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => openEditForm(q)} style={styles.editBtn}>Edit</button>
                              <button onClick={() => handleDelete(q.id)} style={styles.deleteBtn}>Del</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* FORM VIEW (ADD / EDIT) */}
            {activeTab === 'questions' && showForm && (
              <div>
                <div style={styles.flexBetween}>
                  <h3 style={styles.sectionTitle}>{editingId ? 'Edit Question' : 'Upload New Question'}</h3>
                  <button onClick={() => setShowForm(false)} style={styles.cancelBtn}>Cancel</button>
                </div>
                <form onSubmit={handleFormSubmit} style={styles.form}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <label style={{ ...styles.label, flex: 1 }}>
                      Day Number: 
                      <input type="number" value={dayNumber} onChange={(e) => setDayNumber(e.target.value)} required style={styles.input} />
                    </label>
                    <label style={{ ...styles.label, flex: 2 }}>
                      Topic: 
                      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required style={styles.input} />
                    </label>
                  </div>
                  
                  <label style={styles.label}>
                    Title: 
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
                  </label>

                  <label style={styles.label}>
                    Short Description: 
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required style={styles.input} />
                  </label>

                  <label style={styles.label}>
                    Theory (Supports HTML tags like &lt;b&gt;, &lt;br&gt;): 
                    <textarea 
                      value={theory} 
                      onChange={(e) => setTheory(e.target.value)} 
                      required 
                      style={{ ...styles.input, minHeight: '150px', resize: 'vertical' }} 
                    />
                  </label>

                  <button type="submit" disabled={isSubmitting} style={styles.submitBtn}>
                    {isSubmitting ? "Saving..." : "Save to Database"}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { margin: 0, color: '#202124' },
  userEmail: { color: '#0f9d58', fontWeight: 'bold' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#e8eaed', color: '#202124', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  tabsContainer: { display: 'flex', gap: '10px', marginBottom: '20px' },
  tab: { padding: '12px 24px', backgroundColor: '#f1f3f4', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', color: '#5f6368', fontWeight: '600', transition: '0.2s' },
  activeTab: { padding: '12px 24px', backgroundColor: '#202124', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', color: '#ffffff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e0e0e0', minHeight: '400px' },
  flexBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle: { margin: 0, color: '#202124', fontSize: '20px' },
  addBtn: { padding: '10px 16px', backgroundColor: '#E65100', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  cancelBtn: { padding: '8px 16px', backgroundColor: '#fff', color: '#d93025', border: '1px solid #d93025', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  editBtn: { padding: '6px 12px', backgroundColor: '#e8f0fe', color: '#1a73e8', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' },
  deleteBtn: { padding: '6px 12px', backgroundColor: '#fce8e6', color: '#d93025', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' },
  th: { borderBottom: '2px solid #dadce0', padding: '14px 12px', color: '#5f6368', fontWeight: '600', fontSize: '14px' },
  tr: { borderBottom: '1px solid #f1f3f4' },
  td: { padding: '14px 12px', color: '#202124', fontSize: '15px' },
  streakBadge: { backgroundColor: '#FFF3E0', color: '#E65100', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' },
  label: { display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: '600', color: '#5f6368', fontSize: '14px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #dadce0', fontSize: '16px', outline: 'none', fontFamily: 'inherit' },
  submitBtn: { padding: '14px', marginTop: '10px', backgroundColor: '#E65100', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }
};

export default AdminDashboard;