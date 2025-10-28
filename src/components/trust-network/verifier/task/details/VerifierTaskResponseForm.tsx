import { timeDiffHours } from "@lib/time";
import { Progress } from "@components/3rdparty/ui/progress";
import { SheetTitle } from "@components/3rdparty/ui/sheet";

import { useVerifierStore } from "../../libs/useVerifierStore";
import { LawyerForm } from "./forms/LawyerForm";
import { SurveyorForm } from "./forms/SurveyorForm";
import { RegistryForm } from "./forms/RegistryForm";
import { FieldAgentForm } from "./forms/FieldAgentForm";
import { useState } from "react";
import { VerifierRole, VerifierTaskStatus } from "../../models";
import { Button } from "@components/3rdparty/ui/button";

export default function VerifierTaskResponseForm() {
  const [showSignature, setShowSignature] = useState(false);
  const [showDecline, setShowDecline] = useState(false);
  const [formData, setFormData] = useState(
    // task.formDraft ||
    {}
  );
  const {
    viewCurrentVerifierTask,
    setViewCurrentVerifierTask,
    currentVerifierTask,
    setCurrentVerifierTask,
  } = useVerifierStore();

  const canSubmit =
    currentVerifierTask?.status === VerifierTaskStatus.IN_PROGRESS ||
    currentVerifierTask?.status === VerifierTaskStatus.ACCEPTED;

  const handleSaveDraft = () => {
    // saveDraft(task.id, formData);
  };

  const getRoleForm = () => {
    switch (currentVerifierTask?.role_required) {
      case VerifierRole.LAWYER:
        return (
          <LawyerForm
            task={currentVerifierTask}
            data={formData}
            onChange={setFormData}
          />
        );
      case VerifierRole.SURVEYOR:
        return (
          <SurveyorForm
            task={currentVerifierTask}
            data={formData}
            onChange={setFormData}
          />
        );
      case VerifierRole.FIELD_AGENT:
        return (
          <FieldAgentForm
            task={currentVerifierTask}
            data={formData}
            onChange={setFormData}
          />
        );
      case VerifierRole.REGISTRY:
        return (
          <RegistryForm
            task={currentVerifierTask}
            data={formData}
            onChange={setFormData}
          />
        );
    }
  };

  return (
    <>
      {getRoleForm()}
      
      {canSubmit && (
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="flex-1"
          >
            Save Draft
          </Button>
          <Button onClick={() => setShowSignature(true)} className="flex-1">
            Submit Task
          </Button>
        </div>
      )}
    </>
  );
}
