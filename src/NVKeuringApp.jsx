
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function NVKeuringApp() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [armaturen, setArmaturen] = useState([]);
  const [armatuurInput, setArmatuurInput] = useState({
    locatie: "",
    type: "",
    status: "",
    opmerkingen: "",
  });

  useEffect(() => {
    // Voeg dummydata toe voor Fort Meerdijk met armaturen uit afbeelding
    const fortMeerdijk = {
      name: "Fort Meerdijk",
      armaturen: [
        { locatie: "traphuis zuidwest 2e verdieping", type: "Permanent", status: "onbekend", opmerkingen: "automatisch geïmporteerd" },
        { locatie: "traphuis zuidoost 1/2e verd.", type: "Permanent", status: "onbekend", opmerkingen: "automatisch geïmporteerd" },
        { locatie: "traphuis noordoost 3e verd.", type: "Permanent", status: "onbekend", opmerkingen: "automatisch geïmporteerd" },
        { locatie: "gangen bgg en kelder", type: "Permanent", status: "onbekend", opmerkingen: "automatisch geïmporteerd" },
        { locatie: "traphuis noordwest verdieping 0", type: "Permanent", status: "onbekend", opmerkingen: "automatisch geïmporteerd" },
        { locatie: "traphuis noordwest 3e verd.", type: "Permanent", status: "onbekend", opmerkingen: "automatisch geïmporteerd" },
        { locatie: "traphuis noordoost bg werk.ast", type: "Permanent", status: "onbekend", opmerkingen: "automatisch geïmporteerd" },
        { locatie: "traphuis noordoost 5e verd.", type: "LED", status: "onbekend", opmerkingen: "automatisch geïmporteerd" },
      ],
    };
    setProjects([fortMeerdijk]);
  }, []);

  const addProject = () => {
    if (newProject) {
      setProjects([...projects, { name: newProject, armaturen: [] }]);
      setNewProject("");
    }
  };

  const selectProject = (project) => {
    setSelectedProject(project);
    setArmaturen(project.armaturen);
  };

  const addArmatuur = () => {
    const updated = [...armaturen, armatuurInput];
    setArmaturen(updated);
    selectedProject.armaturen = updated;
    setArmatuurInput({ locatie: "", type: "", status: "", opmerkingen: "" });
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="space-y-2 p-4">
          <h2 className="text-xl font-bold">Projectbeheer</h2>
          <Input
            placeholder="Nieuw projectnaam"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
          />
          <Button onClick={addProject}>Toevoegen</Button>
          <div className="pt-2">
            {projects.map((project, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => selectProject(project)}
                className="m-1"
              >
                {project.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedProject && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="text-xl font-bold">
              Keuring voor: {selectedProject.name}
            </h2>
            <div className="grid gap-2">
              <Label>Locatie</Label>
              <Input
                value={armatuurInput.locatie}
                onChange={(e) =>
                  setArmatuurInput({ ...armatuurInput, locatie: e.target.value })
                }
              />
              <Label>Type</Label>
              <Input
                value={armatuurInput.type}
                onChange={(e) =>
                  setArmatuurInput({ ...armatuurInput, type: e.target.value })
                }
              />
              <Label>Status</Label>
              <Input
                value={armatuurInput.status}
                onChange={(e) =>
                  setArmatuurInput({ ...armatuurInput, status: e.target.value })
                }
              />
              <Label>Opmerkingen</Label>
              <Textarea
                value={armatuurInput.opmerkingen}
                onChange={(e) =>
                  setArmatuurInput({
                    ...armatuurInput,
                    opmerkingen: e.target.value,
                  })
                }
              />
              <Button onClick={addArmatuur}>Armatuur toevoegen</Button>
            </div>
            <div className="pt-4">
              <h3 className="font-semibold">Armaturenlijst</h3>
              <ul className="list-disc pl-4">
                {armaturen.map((a, i) => (
                  <li key={i}>
                    {a.locatie} - {a.type} - {a.status} - {a.opmerkingen}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
