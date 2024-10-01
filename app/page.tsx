import Hero from "@/components/hero"
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps"
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps"
import { hasEnvVars } from "@/utils/supabase/check-env-vars"

import { GetChronology } from "@/components/get-chronology"

export default async function Index() {
  return (
    <>
      <div className="m-5">
        <GetChronology />
      </div>
    </>
  )
}
