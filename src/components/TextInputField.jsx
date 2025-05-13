import { motion } from "framer-motion";
const TextInputField = ({
  inputId = "email-content",
  title = "Title",
  inputValue,
  setInputValue,
  readOnly,
  handleAction,
  handleActionText = "Clear",
}) => {
  return (
    <div>
      <label htmlFor={inputId}>
        <span className="text-sm font-medium text-gray-700">{title} </span>

        <div className="relative mt-1 overflow-hidden rounded border border-gray-300 shadow-sm focus-within:ring focus-within:ring-blue-600">
          <textarea
            readOnly={readOnly}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            id={inputId}
            className="w-full p-2 resize-none outline-none border-none focus:ring-0 sm:text-sm"
            rows="6"
          ></textarea>

          <div className="flex items-center justify-end gap-2 p-1.5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAction}
              type="button"
              className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100"
            >
              {handleActionText}
            </motion.button>
          </div>
        </div>
      </label>
    </div>
  );
};

export default TextInputField;
