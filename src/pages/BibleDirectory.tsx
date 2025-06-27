
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Book, Globe, Users } from 'lucide-react';

const BibleDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bibles = [
    {
      id: 'niv',
      name: 'New International Version',
      abbreviation: 'NIV',
      language: 'English',
      publisher: 'Biblica',
      year: '2011',
      description: 'The most popular modern English Bible translation, known for its clarity and accuracy.',
      popularity: 'Very High'
    },
    {
      id: 'esv',
      name: 'English Standard Version',
      abbreviation: 'ESV',
      language: 'English',
      publisher: 'Crossway',
      year: '2001',
      description: 'A literal translation that maintains readability and literary excellence.',
      popularity: 'High'
    },
    {
      id: 'nlt',
      name: 'New Living Translation',
      abbreviation: 'NLT',
      language: 'English',
      publisher: 'Tyndale House',
      year: '1996',
      description: 'A dynamic thought-for-thought translation that is easy to understand.',
      popularity: 'High'
    },
    {
      id: 'kjv',
      name: 'King James Version',
      abbreviation: 'KJV',
      language: 'English',
      publisher: 'Various',
      year: '1611',
      description: 'The classic English Bible translation with traditional language.',
      popularity: 'High'
    },
    {
      id: 'rvr60',
      name: 'Reina-Valera 1960',
      abbreviation: 'RVR60',
      language: 'Spanish',
      publisher: 'Sociedades Bíblicas Unidas',
      year: '1960',
      description: 'The most widely used Spanish Bible translation.',
      popularity: 'Very High'
    },
    {
      id: 'lsg',
      name: 'Louis Segond 1910',
      abbreviation: 'LSG',
      language: 'French',
      publisher: 'Alliance Biblique Universelle',
      year: '1910',
      description: 'The standard French Protestant Bible translation.',
      popularity: 'High'
    }
  ];

  const filteredBibles = bibles.filter(bible =>
    bible.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bible.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bible.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'Very High': return 'bg-[#FF3D4D] text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Bible Directory</h1>
          <p className="text-xl text-muted-foreground">
            Explore hundreds of Bible translations available through our API
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, abbreviation, or language..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Book className="h-8 w-8 text-[#FF3D4D] mx-auto mb-2" />
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Bible Translations</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Globe className="h-8 w-8 text-[#FF3D4D] mx-auto mb-2" />
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-[#FF3D4D] mx-auto mb-2" />
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm text-muted-foreground">Daily API Calls</div>
            </CardContent>
          </Card>
        </div>

        {/* Bible List */}
        <div className="space-y-4">
          {filteredBibles.map((bible) => (
            <Card key={bible.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {bible.name}
                      <Badge variant="outline">{bible.abbreviation}</Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {bible.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className={getPopularityColor(bible.popularity)}>
                      {bible.popularity}
                    </Badge>
                    <Badge variant="secondary">{bible.language}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <strong>Publisher:</strong> {bible.publisher} | <strong>Year:</strong> {bible.year}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Sample
                    </Button>
                    <Button size="sm">
                      Get API Access
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBibles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No Bibles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibleDirectory;
