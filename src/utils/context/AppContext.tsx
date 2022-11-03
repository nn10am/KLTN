import { createContext, useState } from 'react'

interface IAppContext {
  user: any
  setUser: any
}

export const AppContext = createContext<IAppContext>({
  user: null,
  setUser: () => {},
})

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
