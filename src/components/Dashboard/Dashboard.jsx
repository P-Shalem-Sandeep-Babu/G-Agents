import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getUserContent } from "../../firebase/firestore";
import { FiUser, FiBook, FiFileText, FiActivity, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logo from "D:/Project Firebase/sandy/public/assets/logo.png";

const Dashboard = () => {
  const { currentUser, signout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [userContent, setUserContent] = useState({
    lessons: [],
    worksheets: [],
    stories: [],
    assessments: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    const fetchUserContent = async () => {
      setIsLoading(true);
      try {
        const [lessons, worksheets, stories, assessments] = await Promise.all([
          getUserContent(currentUser.uid, "lesson"),
          getUserContent(currentUser.uid, "worksheet"),
          getUserContent(currentUser.uid, "story"),
          getUserContent(currentUser.uid, "assessment")
        ]);
        
        setUserContent({
          lessons,
          worksheets,
          stories,
          assessments
        });
      } catch (error) {
        console.error("Error fetching user content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserContent();
  }, [currentUser, navigate]);
  
  const handleLogout = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Your Profile</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FiUser size={24} />
                </div>
                <div>
                  <h4 className="font-medium">{currentUser.email}</h4>
                  <p className="text-sm text-gray-500">Teacher</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-blue-800">Total Content Created</h5>
                  <p className="text-2xl font-bold mt-1">
                    {userContent.lessons.length + 
                     userContent.worksheets.length + 
                     userContent.stories.length +
                     userContent.assessments.length}
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-green-800">Last Active</h5>
                  <p className="text-lg font-medium mt-1">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "lessons":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Your Lesson Plans</h3>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : userContent.lessons.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                No lesson plans created yet
              </div>
            ) : (
              <div className="space-y-3">
                {userContent.lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-white rounded-lg shadow p-4">
                    <h4 className="font-medium">{lesson.syllabus || "Untitled Lesson"}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Grade {lesson.grade} • {new Date(lesson.createdAt?.toDate()).toLocaleDateString()}
                    </p>
                    <div className="mt-2 text-sm line-clamp-2">
                      {lesson.content.substring(0, 200)}...
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "worksheets":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Your Worksheets</h3>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : userContent.worksheets.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                No worksheets created yet
              </div>
            ) : (
              <div className="space-y-3">
                {userContent.worksheets.map((worksheet) => (
                  <div key={worksheet.id} className="bg-white rounded-lg shadow p-4">
                    <h4 className="font-medium">{worksheet.topic || "Untitled Worksheet"}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Grade {worksheet.grade} • {new Date(worksheet.createdAt?.toDate()).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Usage Analytics</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-indigo-800">Lesson Plans</h5>
                  <p className="text-2xl font-bold mt-1">{userContent.lessons.length}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-purple-800">Worksheets</h5>
                  <p className="text-2xl font-bold mt-1">{userContent.worksheets.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-green-800">Stories</h5>
                  <p className="text-2xl font-bold mt-1">{userContent.stories.length}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Recent Activity</h5>
                <div className="space-y-3">
                  {[...userContent.lessons, ...userContent.worksheets, ...userContent.stories]
                    .sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate())
                    .slice(0, 5)
                    .map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {item.type === "lesson" ? (
                            <FiBook size={16} className="text-indigo-600" />
                          ) : item.type === "worksheet" ? (
                            <FiFileText size={16} className="text-purple-600" />
                          ) : (
                            <FiActivity size={16} className="text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {item.syllabus || item.topic || "Untitled Content"}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {new Date(item.createdAt?.toDate()).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 py-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FiUser size={20} />
                </div>
                <div>
                  <h3 className="font-medium">{currentUser?.email}</h3>
                  <p className="text-xs text-gray-500">Teacher</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${activeTab === "profile" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <FiUser size={16} />
                  <span>Profile</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("lessons")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${activeTab === "lessons" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <FiBook size={16} />
                  <span>Lesson Plans</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("worksheets")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${activeTab === "worksheets" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <FiFileText size={16} />
                  <span>Worksheets</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${activeTab === "analytics" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <FiActivity size={16} />
                  <span>Analytics</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 mt-4"
                >
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;