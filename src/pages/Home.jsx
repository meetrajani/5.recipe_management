import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const openModal1 = (index) => {
    setIsOpen1(true);
    const edit = data[index];
    setEdata(edit);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const closeModal1 = () => {
    setIsOpen1(false);
  };

  const url = "http://localhost:3001/food";
  const [data, setdata] = useState([]);

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    axios.get(url).then((res) => {
      setdata(res.data);
    });
  };

  const [Udata, setUdata] = useState([]);

  const chang = (e) => {
    setUdata({ ...Udata, [e.target.name]: e.target.value });
  };

  const Submit = () => {
    axios.post(url, Udata).then((res) => {
      Fdata();
    });
  };

  // delete

  const DeleteData = (id) => {
    axios.delete(`${url}/${id}`).then((res) => {
      const delet = data.filter((e) => e.id !== id);
      setdata(delet);
    });
  };

  // edit

  const [Edata, setEdata] = useState(null);

  const onchangeEdit = (e) => {
    setEdata({ ...Edata, [e.target.name]: e.target.value });
  };

  const edithandal = (id) => {
    axios.put(`${url}/${id}`, Edata).then((res) => {
      Fdata();
      setEdata(null);
    });
  };

  return (
    <div className="container mx-auto">
      <div className="col-span-10">
        <div className="home_bg pt-24">
          <div className="">
            <div className="text-end me-5">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={openModal}
              >
                Add Data
              </button>
              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h1 className="text-lg font-semibold text-lg">
                        New message
                      </h1>
                      <button
                        className="text-gray-600 text-2xl"
                        onClick={closeModal}
                      >
                        &times;
                      </button>
                    </div>

                    <div className="p-4">
                      <form>
                        <div className="mb-4">
                          <label className="block text-left text-lg text-gray-700">
                            Food Name :
                          </label>
                          <input
                            type="text"
                            name="recipe_s_title"
                            onChange={chang}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-left text-lg text-gray-700">
                            Food url :
                          </label>
                          <input
                            type="text"
                            name="foodimg_url"
                            onChange={chang}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-left text-lg text-gray-700">
                            Ingredients :
                          </label>
                          <input
                            type="text"
                            name="Ingredients"
                            onChange={chang}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-left text-lg text-gray-700">
                            Instructions :
                          </label>
                          <input
                            type="text"
                            name="instructions"
                            onChange={chang}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-left text-lg text-gray-700">
                            Cooking Time :
                          </label>
                          <input
                            type="text"
                            name="cooking_time"
                            onChange={chang}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                      </form>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end p-4 border-t">
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button
                        onClick={Submit}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Send message
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="search flex items-center justify-center">
              <IoSearch className="text-5xl rounded-s-full bg-white py-3 shadow-lg" />
              <input
                className="text-2xl w-96 py-2 rounded-e-full shadow-md focus:shadow-lg focus:outline-none"
                type="text"
                name="search"
              />
            </div>
          </div>
          <p className="text-center text-lg pt-10">
            Personalize Your Experience
          </p>
          <p className="text-center font-semibold text-4xl pb-10">
            What are your favorite cuisines?
          </p>
          <p className="text-2xl font-semibold text-center py-5">
            Just for you
          </p>
          <div className="grid grid-cols-3 pb-10">
            {data.map((e, index) => {
              return (
                <div key={index}>
                  <div className="card w-72 bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                      src={e.foodimg_url}
                      alt="..."
                      className="card-img-top w-full h-48 object-cover"
                    />
                    <div className="card-body p-4">
                      <h5 className="card-title text-xl font-semibold mb-2">
                        {e.recipe_s_title}
                      </h5>
                      <p className="card-text text-gray-700 mb-4 card_text ">
                        {e.instructions}
                      </p>
                      <div className="flex justify-between">
                        <button
                          onClick={() => openModal1(index)}
                          className="btn bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                        >
                          Edit
                        </button>
                        {isOpen1 && Edata && (
                          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                              <div className="flex justify-between items-center p-4 border-b">
                                <h1 className="text-lg font-semibold text-lg">
                                  Edit Food
                                </h1>
                                <button
                                  className="text-gray-600 text-2xl"
                                  onClick={closeModal1}
                                >
                                  &times;
                                </button>
                              </div>

                              <div className="p-4">
                                <form>
                                  <div className="mb-4">
                                    <label className="block text-left text-lg text-gray-700">
                                      Food Name:
                                    </label>
                                    <input
                                      type="text"
                                      name="recipe_s_title"
                                      value={Edata.recipe_s_title || ""}
                                      onChange={onchangeEdit}
                                      className="w-full px-3 py-2 border rounded"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-left text-lg text-gray-700">
                                      Food URL:
                                    </label>
                                    <input
                                      type="text"
                                      name="foodimg_url"
                                      value={Edata.foodimg_url || ""}
                                      onChange={onchangeEdit}
                                      className="w-full px-3 py-2 border rounded"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-left text-lg text-gray-700">
                                      Ingredients:
                                    </label>
                                    <input
                                      type="text"
                                      name="Ingredients"
                                      value={Edata.Ingredients || ""}
                                      onChange={onchangeEdit}
                                      className="w-full px-3 py-2 border rounded"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-left text-lg text-gray-700">
                                      Instructions:
                                    </label>
                                    <input
                                      type="text"
                                      name="instructions"
                                      value={Edata.instructions || ""}
                                      onChange={onchangeEdit}
                                      className="w-full px-3 py-2 border rounded"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-left text-lg text-gray-700">
                                      Cooking Time:
                                    </label>
                                    <input
                                      type="text"
                                      name="cooking_time"
                                      value={Edata.cooking_time || ""}
                                      onChange={onchangeEdit}
                                      className="w-full px-3 py-2 border rounded"
                                    />
                                  </div>
                                </form>
                              </div>

                              <div className="flex justify-end p-4 border-t">
                                <button
                                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                  onClick={closeModal1}
                                >
                                  Close
                                </button>
                                <button
                                  onClick={() => edithandal(Edata.id)}
                                  className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        <button
                          className="btn bg-red-700 text-white py-2 px-4 rounded hover:bg-red-600"
                          onClick={() => DeleteData(e.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
