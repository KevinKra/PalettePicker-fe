export const loginUser = async (username, password) => {
  const url = "http://localhost:3001";
  const path = "/api/v1/users";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };
  try {
    const response = await fetch(url + path, options);
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
    return response.json();
  } catch (error) {
    throw Error(error.message);
  }
};

export const createUser = async (username, password) => {
  const url = "http://localhost:3001";
  const path = "/api/v1/users/new";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };
  const response = await fetch(url + path, options);
  try {
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
    return response.json();
  } catch (error) {
    throw Error(error.message);
  }
};

export const getProjects = async userID => {
  const url = "http://localhost:3001";
  const path = `/api/v1/users/${userID}/projects`;
  const response = await fetch(url + path);
  try {
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
    return response.json();
  } catch ({ message }) {
    throw Error(message);
  }
};

export const getProject = async (userID, projectID) => {
  const url = "http://localhost:3001";
  const path = `/api/v1/users/${userID}/projects/${projectID}`;
  const response = await fetch(url + path);
  try {
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
    return await response.json();
  } catch ({ message }) {
    throw Error(message);
  }
};

export const createProject = async (user_id, name, description) => {
  const url = "http://localhost:3001";
  const path = "/api/v1/users/projects/new";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, name, description })
  };
  const response = await fetch(url + path, options);
  try {
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
    const obj = await response.json();
    return obj.id;
  } catch ({ message }) {
    throw Error(message);
  }
};

export const editProject = async (projectID, name, description) => {
  const url = "http://localhost:3001";
  const path = `/api/v1/users/projects/${projectID}/edit`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description })
  };
  const response = await fetch(url + path, options);
  try {
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
    const obj = await response.json();
    return obj[0];
  } catch ({ message }) {
    throw Error(message);
  }
};

export const deleteProject = async (userID, projectID) => {
  const url = "http://localhost:3001";
  const path = `/api/v1/users/${userID}/projects/${projectID}`;
  const options = { method: "DELETE" };
  const response = await fetch(url + path, options);
  try {
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
    return await response.json();
  } catch ({ message }) {
    throw Error(message);
  }
};

export const getPalettes = async userID => {
  const url = "http://localhost:3001";
  const path = `/api/v1/users/${userID}/palettes`;
  const response = await fetch(url + path);
  try {
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
    return await response.json();
  } catch ({ message }) {
    throw Error(message);
  }
};

export const createPalette = async (projectID, name, colors) => {
  const url = "http://localhost:3001";
  const path = `/api/v1/users/projects/${projectID}/palettes`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, colors })
  };
  const response = await fetch(url + path, options);
  try {
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
    return await response.json();
  } catch ({ message }) {
    throw Error(message);
  }
};

export const deletePalette = async (projectID, paletteID) => {
  const url = "http://localhost:3001";
  const path = `/api/v1/projects/${projectID}/palettes/${paletteID}`;
  const options = { method: "DELETE" };
  const response = await fetch(url + path, options);
  try {
    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
    return await response.json();
  } catch ({ message }) {
    throw Error(message);
  }
};
