jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      uid: "mockUserId",
    },
    signInWithCustomToken: jest.fn().mockResolvedValue({
      user: {
        uid: "mockUserId",
        email: "test@example.com",
      },
    }),
  })),
}));

jest.mock("firebase/firestore", () => {
  const mockData = {
    goals: {
      "goalIdExample": {
        id: "goalIdExample",
        name: "Goal Test",
        totalBooks: 5,
        books: [],
        status: "Not Started",
        startDate: new Date(),
      },
    },
  };

  return {
    getFirestore: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
    addDoc: jest.fn((_, data) => {
      const newId = `goal_${Date.now()}`;
      mockData.goals[newId] = { id: newId, ...data };
      return Promise.resolve({ id: newId });
    }),
    updateDoc: jest.fn((docRef, updates) => {
      const goalId = docRef.id;
      if (!mockData.goals[goalId]) {
        throw new Error("Meta não encontrada");
      }
      mockData.goals[goalId] = { ...mockData.goals[goalId], ...updates };
      return Promise.resolve();
    }),
    query: jest.fn(),
    where: jest.fn(),
    doc: jest.fn((_, id) => ({ id })),
    getDoc: jest.fn((docRef) => {
      const goalData = mockData.goals[docRef.id];
      return Promise.resolve({
        exists: () => !!goalData,
        data: () => goalData,
      });
    }),
  };
});



jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn().mockResolvedValue({
    ref: { fullPath: "path/to/file" },
  }),
  getDownloadURL: jest.fn().mockResolvedValue("https://mocked-url.com/image.jpg"),
}));
