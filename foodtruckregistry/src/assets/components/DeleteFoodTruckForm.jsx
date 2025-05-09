import { useState } from "react";

function DeleteForm({ props }) {
  const [truckUser, setTruckUser] = props;
  //State to manage the input field of the business name to be deleted
  const [deleteInput, setDeleteInput] = useState({
    name: "",
  });
  console.log(deleteInput);

  const handleChange = (e) => {
    setDeleteInput((prev) => ({
      ...deleteInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeletion = (e) => {
    e.preventDefault();
    //Find truck business name in truckUser and delete it from the list
    if (!deleteInput.name) {
      return;
    }
    console.log("Deleting marker with name:", deleteInput.name);
    setTruckUser((prev) =>
      prev.filter((truckName) => truckName.name !== deleteInput.name)
    );
  };

  return (
    <form onSubmit={handleDeletion}>
      <input
        type="text"
        name="name"
        placeholder="Enter business name here"
        onChange={handleChange}
      />
      <input type="submit" value="Delete marker" />
    </form>
  );
}
export default DeleteForm;
