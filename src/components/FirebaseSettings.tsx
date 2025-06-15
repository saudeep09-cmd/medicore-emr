
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { Database, Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export function FirebaseSettings() {
  const { useFirebase, toggleFirebase, loadPatients } = useStore();
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  });

  const handleToggleFirebase = async () => {
    if (!useFirebase) {
      // Show configuration form when enabling
      setShowConfig(true);
    } else {
      // Disable Firebase
      toggleFirebase(false);
      toast({
        title: "Firebase Disabled",
        description: "Switched back to local storage.",
      });
    }
  };

  const handleSaveConfig = async () => {
    // TODO: Update Firebase config with user's values
    toggleFirebase(true);
    setShowConfig(false);
    
    try {
      await loadPatients();
      toast({
        title: "Firebase Enabled",
        description: "Successfully connected to Firebase database.",
      });
    } catch (error) {
      toast({
        title: "Firebase Connection Failed",
        description: "Please check your configuration.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5" />
          Database Settings
        </CardTitle>
        <CardDescription>
          Configure Firebase backend for persistent data storage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span>Current Backend:</span>
            <Badge variant={useFirebase ? "default" : "secondary"}>
              {useFirebase ? "Firebase" : "Local Storage"}
            </Badge>
          </div>
          <Button onClick={handleToggleFirebase} variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            {useFirebase ? "Disable Firebase" : "Enable Firebase"}
          </Button>
        </div>

        {showConfig && (
          <div className="space-y-4 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">
              Please enter your Firebase configuration. You can find these values in your Firebase project settings.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  value={config.apiKey}
                  onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                  placeholder="AIza..."
                />
              </div>
              <div>
                <Label htmlFor="authDomain">Auth Domain</Label>
                <Input
                  id="authDomain"
                  value={config.authDomain}
                  onChange={(e) => setConfig({...config, authDomain: e.target.value})}
                  placeholder="your-project.firebaseapp.com"
                />
              </div>
              <div>
                <Label htmlFor="projectId">Project ID</Label>
                <Input
                  id="projectId"
                  value={config.projectId}
                  onChange={(e) => setConfig({...config, projectId: e.target.value})}
                  placeholder="your-project-id"
                />
              </div>
              <div>
                <Label htmlFor="storageBucket">Storage Bucket</Label>
                <Input
                  id="storageBucket"
                  value={config.storageBucket}
                  onChange={(e) => setConfig({...config, storageBucket: e.target.value})}
                  placeholder="your-project.appspot.com"
                />
              </div>
              <div>
                <Label htmlFor="messagingSenderId">Messaging Sender ID</Label>
                <Input
                  id="messagingSenderId"
                  value={config.messagingSenderId}
                  onChange={(e) => setConfig({...config, messagingSenderId: e.target.value})}
                  placeholder="123456789"
                />
              </div>
              <div>
                <Label htmlFor="appId">App ID</Label>
                <Input
                  id="appId"
                  value={config.appId}
                  onChange={(e) => setConfig({...config, appId: e.target.value})}
                  placeholder="1:123456789:web:..."
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleSaveConfig}>Save & Connect</Button>
              <Button variant="outline" onClick={() => setShowConfig(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {!useFirebase && (
          <p className="text-sm text-muted-foreground">
            Currently using local storage. Data will be lost when you refresh the page.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
