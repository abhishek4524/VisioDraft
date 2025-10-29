import React from "react";
import Navbar from "../components/Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
        <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-12">
        <div className="p-8">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-10">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-6 flex-shrink-0">
                <span className="text-2xl font-bold">1</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may collect personal details such as your name, email, and usage data when you use our services. 
                  This includes information you provide directly and data collected automatically through your interaction with our services.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-6 flex-shrink-0">
                <span className="text-2xl font-bold">2</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">How We Use Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  The collected data is used to improve our services, personalize your experience, and ensure platform security. 
                  We may also use your information to communicate with you about updates, security alerts, and support messages.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-6 flex-shrink-0">
                <span className="text-2xl font-bold">3</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Sharing of Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell or trade your personal information. Limited sharing may occur with trusted partners for operational purposes, 
                  always under strict confidentiality agreements. We may disclose information when required by law or to protect our rights.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-6 flex-shrink-0">
                <span className="text-2xl font-bold">4</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use industry-standard security measures to protect your data, including encryption, access controls, and regular security assessments. 
                  However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-6 flex-shrink-0">
                <span className="text-2xl font-bold">5</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Changes to Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our Privacy Policy may be updated from time to time to reflect changes in our practices or for other operational, 
                  legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page and updating the effective date.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@example.com" className="text-blue-600 hover:underline">visiodraft@gmail.com</a>.
            </p>
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;