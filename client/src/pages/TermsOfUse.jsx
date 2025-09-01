import React from "react";
import Navbar from "../components/Navbar";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
        <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-12">
        <div className="p-8">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Use</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Welcome to VisioDraft. By accessing or using our platform, you agree to
              comply with the following terms and conditions.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-10">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-6 flex-shrink-0">
                <span className="text-2xl font-bold">1</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By using this platform, you acknowledge that you have read, understood,
                  and agree to be bound by these Terms of Use. If you do not agree to these terms,
                  please refrain from using our services.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-6 flex-shrink-0">
                <span className="text-2xl font-bold">2</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Use of Service</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree not to misuse the services provided. Any unlawful or harmful
                  activity is strictly prohibited. This includes but is not limited to: attempting
                  to disrupt service, accessing accounts without authorization, or using the service
                  for any illegal purposes.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-6 flex-shrink-0">
                <span className="text-2xl font-bold">3</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  All content, trademarks, and logos on this site are the property of
                  VisioDraft and may not be used without permission. Users retain rights to their
                  own content but grant VisioDraft a license to use that content to provide the service.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-6 flex-shrink-0">
                <span className="text-2xl font-bold">4</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  We are not responsible for any damages or data loss caused by using our
                  platform. To the fullest extent permitted by law, VisioDraft shall not be liable
                  for any indirect, incidental, special, consequential, or punitive damages.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-6 flex-shrink-0">
                <span className="text-2xl font-bold">5</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  VisioDraft reserves the right to update these terms at any time. Users
                  will be notified of significant changes. Continued use of the service after
                  changes constitutes acceptance of the modified terms.
                </p>
              </div>
            </div>
          </div>

          {/* Governing Law */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Governing Law</h3>
            <p className="text-gray-700">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction
              in which VisioDraft is established, without regard to its conflict of law provisions.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-gray-700">
              If you have any questions about these Terms of Use, please contact us at{" "}
              <a href="mailto:legal@visiodraft.com" className="text-blue-600 hover:underline">visiodraft@gmail.com</a>.
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

export default TermsOfUse;