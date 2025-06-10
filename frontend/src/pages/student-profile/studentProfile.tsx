import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/authContext";
import { useStudentProfile } from "../../hooks/useProfileStudents";
import UpdateStudentForm from "../../components/common/forms/update-student/updateStudentForm"; // Cambié StudentForm por UpdateStudentForm
import StudentDetails from "./studentProfileDetails";

const StudentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { token: tokenFromAuth } = useAuth();
  const token = tokenFromAuth === null ? undefined : tokenFromAuth;
  const {
    student,
    error,
    isEditing,
    updatedData,
    handleEdit,
    handleChange,
    handleSubmitEdit,
    handleDelete,
    handleDeleteFile,
    isDeleted,
  } = useStudentProfile(id, token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDeleted) {
      navigate("/dashboard");
    }
  }, [isDeleted, navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!student) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <UpdateStudentForm // Asegúrate de usar el nombre correcto aquí
          student={updatedData!}
          onChange={handleChange}
          onSubmit={handleSubmitEdit}
          onDeleteFile={handleDeleteFile}
        />
      ) : (
        <StudentDetails
          student={student}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default StudentProfile;
