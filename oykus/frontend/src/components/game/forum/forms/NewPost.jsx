import { useState } from "react";
import { Form } from "antd";
import { okpApi } from "@/services/api";
import {
  OkpForm,
  OkpFormField,
  OkpFormActions,
  OkpFormSubmit,
  OkpFormReset,
} from "@/components/form";

export default function OkpForumNewPost({ topicId, afterSubmit = () => {} }) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

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
    setIsSubmitting(true);

    try {
      const result = await okpApi.createPost({
        ...e,
        topic: topicId,
      });
      if (result?.success) {
        afterSubmit();
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OkpForm form={form} submit={handleSubmit}>
      <OkpFormField
        name="character"
        label="Character"
        inputType="select"
        placeholder="Select a character"
        options={[
          {
            value: "1",
            label: "Pachua",
          },
          {
            value: "2",
            label: "Sedem",
          },
        ]}
        required
      />
      <OkpFormField
        name="message"
        label="Message"
        inputType="textarea"
        placeholder="Enter your message"
        rows={8}
        required
      />
      <OkpFormActions>
        <OkpFormReset label="Reset" disabled={isSubmitting} />
        <OkpFormSubmit label="Send" isLoading={isSubmitting} />
      </OkpFormActions>
    </OkpForm>
  );
}
