"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinish = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {/* Cant buy past events */}
      {hasEventFinish ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} user={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
