import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./assets/loader.svg";
import TextInputField from "./components/TextInputField";
import { motion } from "framer-motion";
import axios from "axios";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [emailContent, setEmailContent] = useState("");
  const [responseTone, setResponseTone] = useState("");

  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const body = { emailContent, responseTone };
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/${apiUrl}`, body);

      setGeneratedReply(
        typeof response?.data === "string"
          ? response?.data
          : JSON.stringify(response?.data)
      );
      setLoading(false);
      toast.success("Response generated successfully");
    } catch (error) {
      toast.error("Failed to generate email reply...Kindly try again later!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(generatedReply);
    toast.success("Copied to Clipboard 📎");
  };

  return (
    <>
      <Toaster />

      <div className="container max-w-2xl mx-auto py-4">
        <h4 className="text-3xl text-center font-semibold">
          Smart Email Reply
        </h4>

        <div className="px-3">
          <TextInputField
            title="Email Content"
            inputValue={emailContent}
            setInputValue={setEmailContent}
            handleAction={() => setEmailContent("")}
          />

          <div className="w-full mt-4">
            <label htmlFor="response-tone">
              <span className="text-sm font-medium text-gray-700">
                {" "}
                Response Tone (optional){" "}
              </span>

              <select
                name="response-tone"
                id="response-tone"
                onChange={(e) => setResponseTone(e.target.value)}
                value={responseTone}
                className="mt-1 w-full py-2 outline-none rounded border border-gray-300 shadow-sm focus-within:ring focus-within:ring-blue-600 sm:text-sm"
              >
                <option value="">None</option>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
              </select>

              <motion.button
                onClick={handleSubmit}
                whileTap={{ scale: 0.95 }}
                type="button"
                disabled={loading || !emailContent}
                className={`py-2 px-4 w-full flex justify-center items-center  ${
                  loading ? "bg-blue-600/90" : "bg-blue-600"
                } hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg mt-4`}
              >
                {loading && (
                  <img
                    src={Loader}
                    className="animate-spin mr-2"
                    alt="loader"
                  />
                )}
                <span className={`${loading && "animate-pulse"}`}>
                  {loading ? "Generating Reply" : "Generate Reply"}
                </span>
              </motion.button>
            </label>
          </div>
        </div>

        {generatedReply && (
          <div>
            <TextInputField
              title="Generated Reply"
              inputValue={generatedReply}
              setInputValue={setGeneratedReply}
              handleAction={handleCopyClipboard}
              handleActionText="Copy to clipboard 📎"
              readOnly
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
