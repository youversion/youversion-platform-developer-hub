import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search } from 'lucide-react';

const BibleDirectory = () => {
  const bibles = [
    {
      name: "New International Version",
      abbreviation: "NIV",
      language: "English",
      publisher: "Biblica",
      year: "2011",
      license: "Commercial",
    },
    {
      name: "English Standard Version",
      abbreviation: "ESV",
      language: "English", 
      publisher: "Crossway",
      year: "2001",
      license: "Commercial",
    },
    {
      name: "New Living Translation",
      abbreviation: "NLT",
      language: "English",
      publisher: "Tyndale House",
      year: "2015",
      license: "Commercial",
    },
    {
      name: "King James Version",
      abbreviation: "KJV",
      language: "English",
      publisher: "Public Domain",
      year: "1769",
      license: "Public Domain",
    },
    {
      name: "Nueva Versión Internacional",
      abbreviation: "NVI",
      language: "Spanish",
      publisher: "Biblica",
      year: "1999",
      license: "Commercial",
    },
    {
      name: "Nouvelle Edition de Genève",
      abbreviation: "NEG",
      language: "French",
      publisher: "Société Biblique de Genève",
      year: "1979",
      license: "Commercial",
    },
  ];

  return (
    <div className="container py-12 canvas-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Bible Directory</h1>
          <p className="text-xl text-muted-foreground">
            Browse available Bible translations for your applications
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Bibles by name, language, or publisher..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bibles.map((bible, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <BookOpen className="h-8 w-8 text-[#FF3D4D]" />
                  <Badge 
                    variant={bible.license === 'Public Domain' ? 'default' : 'secondary'}
                  >
                    {bible.license}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{bible.name}</CardTitle>
                <CardDescription>
                  {bible.abbreviation} • {bible.language} • {bible.year}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Publisher:</span>
                    <span>{bible.publisher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Language:</span>
                    <span>{bible.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year:</span>
                    <span>{bible.year}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't See Your Bible?</h2>
          <p className="text-muted-foreground mb-4">
            We're always adding new translations. Contact us to request a specific Bible version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BibleDirectory;
