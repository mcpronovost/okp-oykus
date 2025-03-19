import { useState } from "react";
import { useForumApi } from "@/services/api";
import {
  OkpForm,
  OkpField,
  OkpActions,
  OkpSubmit,
  OkpReset,
} from "@/components/form";

export default function OkpForumNewPost({ topicId, afterSubmit = () => {} }) {
  const { createPost } = useForumApi();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    topic: topicId,
    character: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when the user types/selects
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: [],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    // Character validation
    if (!formData.character) {
      newErrors.character = ["Please select a character."];
    }
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = ["Message is required."];
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
  
      try {
        const result = await createPost(formData);
        if (result?.success) {
          setFormData({
            topic: topicId,
            character: "",
            message: "",
          });
          afterSubmit();
        } else {
          throw new Error(result?.message);
        }
      } catch (error) {
        console.error("Failed to create post:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <OkpForm submit={handleSubmit}>
      <OkpField
        name="character"
        label="Character"
        input="select"
        placeholder="Select a character"
        items={[
          {
            value: "1",
            label: "Pachua",
          },
          {
            value: "2",
            label: "Sedem",
          },
        ]}
        value={formData.character}
        onChange={handleChange}
        errors={errors.character}
        required
      />
      <OkpField
        name="message"
        label="Message"
        input="textarea"
        placeholder="Enter your message"
        rows={8}
        value={formData.message}
        onChange={handleChange}
        errors={errors.message}
        required
      />
      <OkpActions>
        <OkpSubmit label="Send" isLoading={isSubmitting} />
        <OkpReset label="Reset" disabled={isSubmitting} />
      </OkpActions>
    </OkpForm>
  );
}
