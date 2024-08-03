import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Evenement = {
  id_evt: number;
  nom: string;
  date_evt: string;
  description: string;
};

const ModifierEvent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Evenement>({
    id_evt: 0,
    nom: "",
    date_evt: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/events/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch event");
          }
          const eventData = await response.json();
          setEvent(eventData);
        } catch (error) {
          console.error("Failed to fetch event:", error);
        }
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      const updatedEvent = await response.json();
      console.log("Event updated successfully:", updatedEvent);
      router.push("/events");
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  return (
    <div>
      <h1>Modifier l‘événement</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
            type="text"
            name="nom"
            value={event.nom}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date_evt"
            value={new Date(event.date_evt).toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default ModifierEvent;
