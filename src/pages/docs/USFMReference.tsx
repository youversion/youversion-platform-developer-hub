import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const USFMReference = () => {
  const books = [
    { number: '01', identifier: 'GEN', name: 'Genesis', notes: "'1 Moses' in some Bibles" },
    { number: '02', identifier: 'EXO', name: 'Exodus', notes: "'2 Moses' in some Bibles" },
    { number: '03', identifier: 'LEV', name: 'Leviticus', notes: "'3 Moses' in some Bibles" },
    { number: '04', identifier: 'NUM', name: 'Numbers', notes: "'4 Moses' in some Bibles" },
    { number: '05', identifier: 'DEU', name: 'Deuteronomy', notes: "'5 Moses' in some Bibles" },
    { number: '06', identifier: 'JOS', name: 'Joshua', notes: '' },
    { number: '07', identifier: 'JDG', name: 'Judges', notes: '' },
    { number: '08', identifier: 'RUT', name: 'Ruth', notes: '' },
    { number: '09', identifier: '1SA', name: '1 Samuel', notes: '1 Kings or Kingdoms in Orthodox Bibles; do not confuse this abbreviation with ISA for Isaiah' },
    { number: '10', identifier: '2SA', name: '2 Samuel', notes: '2 Kings or Kingdoms in Orthodox Bibles' },
    { number: '11', identifier: '1KI', name: '1 Kings', notes: '3 Kings or Kingdoms in Orthodox Bibles' },
    { number: '12', identifier: '2KI', name: '2 Kings', notes: '4 Kings or Kingdoms in Orthodox Bibles' },
    { number: '13', identifier: '1CH', name: '1 Chronicles', notes: '1 Paralipomenon in Orthodox Bibles' },
    { number: '14', identifier: '2CH', name: '2 Chronicles', notes: '2 Paralipomenon in Orthodox Bibles' },
    { number: '15', identifier: 'EZR', name: 'Ezra', notes: 'This is for Hebrew Ezra, sometimes called 1 Ezra or 1 Esdras; also for Ezra-Nehemiah when one book' },
    { number: '16', identifier: 'NEH', name: 'Nehemiah', notes: 'Sometimes appended to Ezra; called 2 Esdras in the Vulgate' },
    { number: '17', identifier: 'EST', name: 'Esther (Hebrew)', notes: 'This is for Hebrew Esther; for the longer Greek LXX Esther use ESG' },
    { number: '18', identifier: 'JOB', name: 'Job', notes: '' },
    { number: '19', identifier: 'PSA', name: 'Psalms', notes: '150 Psalms in Hebrew, 151 Psalms in Orthodox Bibles, 155 Psalms in West Syriac Bibles' },
    { number: '20', identifier: 'PRO', name: 'Proverbs', notes: '31 Proverbs, but 24 Proverbs in the Ethiopian Bible' },
    { number: '21', identifier: 'ECC', name: 'Ecclesiastes', notes: 'Qoholeth in Catholic Bibles; for Ecclesiasticus use SIR' },
    { number: '22', identifier: 'SNG', name: 'Song of Songs', notes: 'Song of Solomon, or Canticles of Canticles in Catholic Bibles' },
    { number: '23', identifier: 'ISA', name: 'Isaiah', notes: 'Do not confuse this abbreviation with 1SA for 1 Samuel' },
    { number: '24', identifier: 'JER', name: 'Jeremiah', notes: 'The Book of Jeremiah; for the Letter of Jeremiah use LJE' },
    { number: '25', identifier: 'LAM', name: 'Lamentations', notes: 'The Lamentations of Jeremiah' },
    { number: '26', identifier: 'EZK', name: 'Ezekiel', notes: '' },
    { number: '27', identifier: 'DAN', name: 'Daniel (Hebrew)', notes: 'This is for Hebrew Daniel; for the longer Greek LXX Daniel use DAG' },
    { number: '28', identifier: 'HOS', name: 'Hosea', notes: '' },
    { number: '29', identifier: 'JOL', name: 'Joel', notes: '' },
    { number: '30', identifier: 'AMO', name: 'Amos', notes: '' },
    { number: '31', identifier: 'OBA', name: 'Obadiah', notes: '' },
    { number: '32', identifier: 'JON', name: 'Jonah', notes: 'Do not confuse this abbreviation with JHN for John' },
    { number: '33', identifier: 'MIC', name: 'Micah', notes: '' },
    { number: '34', identifier: 'NAM', name: 'Nahum', notes: '' },
    { number: '35', identifier: 'HAB', name: 'Habakkuk', notes: '' },
    { number: '36', identifier: 'ZEP', name: 'Zephaniah', notes: '' },
    { number: '37', identifier: 'HAG', name: 'Haggai', notes: '' },
    { number: '38', identifier: 'ZEC', name: 'Zechariah', notes: '' },
    { number: '39', identifier: 'MAL', name: 'Malachi', notes: '' },
    { number: '41', identifier: 'MAT', name: 'Matthew', notes: 'The Gospel according to Matthew' },
    { number: '42', identifier: 'MRK', name: 'Mark', notes: 'The Gospel according to Mark' },
    { number: '43', identifier: 'LUK', name: 'Luke', notes: 'The Gospel according to Luke' },
    { number: '44', identifier: 'JHN', name: 'John', notes: 'The Gospel according to John' },
    { number: '45', identifier: 'ACT', name: 'Acts', notes: 'The Acts of the Apostles' },
    { number: '46', identifier: 'ROM', name: 'Romans', notes: 'The Letter of Paul to the Romans' },
    { number: '47', identifier: '1CO', name: '1 Corinthians', notes: 'The First Letter of Paul to the Corinthians' },
    { number: '48', identifier: '2CO', name: '2 Corinthians', notes: 'The Second Letter of Paul to the Corinthians' },
    { number: '49', identifier: 'GAL', name: 'Galatians', notes: 'The Letter of Paul to the Galatians' },
    { number: '50', identifier: 'EPH', name: 'Ephesians', notes: 'The Letter of Paul to the Ephesians' },
    { number: '51', identifier: 'PHP', name: 'Philippians', notes: 'The Letter of Paul to the Philippians' },
    { number: '52', identifier: 'COL', name: 'Colossians', notes: 'The Letter of Paul to the Colossians' },
    { number: '53', identifier: '1TH', name: '1 Thessalonians', notes: 'The First Letter of Paul to the Thessalonians' },
    { number: '54', identifier: '2TH', name: '2 Thessalonians', notes: 'The Second Letter of Paul to the Thessalonians' },
    { number: '55', identifier: '1TI', name: '1 Timothy', notes: 'The First Letter of Paul to Timothy' },
    { number: '56', identifier: '2TI', name: '2 Timothy', notes: 'The Second Letter of Paul to Timothy' },
    { number: '57', identifier: 'TIT', name: 'Titus', notes: 'The Letter of Paul to Titus' },
    { number: '58', identifier: 'PHM', name: 'Philemon', notes: 'The Letter of Paul to Philemon' },
    { number: '59', identifier: 'HEB', name: 'Hebrews', notes: 'The Letter to the Hebrews' },
    { number: '60', identifier: 'JAS', name: 'James', notes: 'The Letter of James' },
    { number: '61', identifier: '1PE', name: '1 Peter', notes: 'The First Letter of Peter' },
    { number: '62', identifier: '2PE', name: '2 Peter', notes: 'The Second Letter of Peter' },
    { number: '63', identifier: '1JN', name: '1 John', notes: 'The First Letter of John' },
    { number: '64', identifier: '2JN', name: '2 John', notes: 'The Second Letter of John' },
    { number: '65', identifier: '3JN', name: '3 John', notes: 'The Third Letter of John' },
    { number: '66', identifier: 'JUD', name: 'Jude', notes: 'The Letter of Jude; do not confuse this abbreviation with JDG for Judges, or JDT for Judith' },
    { number: '67', identifier: 'REV', name: 'Revelation', notes: 'The Revelation to John; called Apocalypse in Catholic Bibles' },
  ];

  const deuterocanonical = [
    { number: '68', identifier: 'TOB', name: 'Tobit', notes: '' },
    { number: '69', identifier: 'JDT', name: 'Judith', notes: '' },
    { number: '70', identifier: 'ESG', name: 'Esther Greek', notes: '' },
    { number: '71', identifier: 'WIS', name: 'Wisdom of Solomon', notes: '' },
    { number: '72', identifier: 'SIR', name: 'Sirach', notes: 'Ecclesiasticus or Jesus son of Sirach' },
    { number: '73', identifier: 'BAR', name: 'Baruch', notes: '5 chapters in Orthodox Bibles (LJE is separate); 6 chapters in Catholic Bibles (includes LJE)' },
    { number: '74', identifier: 'LJE', name: 'Letter of Jeremiah', notes: 'Sometimes included in Baruch; called "Rest of Jeremiah" in Ethiopia' },
    { number: '75', identifier: 'S3Y', name: 'Song of the 3 Young Men', notes: 'Includes the Prayer of Azariah; sometimes included in Greek Daniel' },
    { number: '76', identifier: 'SUS', name: 'Susanna', notes: 'Sometimes included in Greek Daniel' },
    { number: '77', identifier: 'BEL', name: 'Bel and the Dragon', notes: 'Sometimes included in Greek Daniel; called "Rest of Daniel" in Ethiopia' },
    { number: '78', identifier: '1MA', name: '1 Maccabees', notes: 'Called "3 Maccabees" in some traditions, printed in Catholic and Orthodox Bibles' },
    { number: '79', identifier: '2MA', name: '2 Maccabees', notes: 'Called "1 Maccabees" in some traditions, printed in Catholic and Orthodox Bibles' },
    { number: '80', identifier: '3MA', name: '3 Maccabees', notes: 'Called "2 Maccabees" in some traditions, printed in Orthodox Bibles' },
    { number: '81', identifier: '4MA', name: '4 Maccabees', notes: 'In an appendix to the Greek Bible and in the Georgian Bible' },
  ];

  return (
    <div className="container py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">USFM Reference</h1>
          <p className="text-muted-foreground text-lg">
            Standard book identifiers for the Unified Scripture Format Markup (USFM) used in Scripture text processing.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About USFM Book Identifiers</CardTitle>
            <CardDescription>
              This table lists all the standard 3-character book identifiers that can be entered after the \id marker at the top of each USFM file. 
              Some scripture editors like Paratext may also include the number shown for each book in the filename for that book.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  Biblical Books 
                  <Badge variant="secondary">{books.length} books</Badge>
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Number</TableHead>
                        <TableHead className="w-28">Identifier</TableHead>
                        <TableHead>English Name</TableHead>
                        <TableHead>Alternative name / Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.map((book) => (
                        <TableRow key={book.identifier}>
                          <TableCell className="font-mono text-sm">{book.number}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {book.identifier}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{book.name}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {book.notes}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  Deuterocanonical & Apocryphal Books
                  <Badge variant="secondary">{deuterocanonical.length} books</Badge>
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Number</TableHead>
                        <TableHead className="w-28">Identifier</TableHead>
                        <TableHead>English Name</TableHead>
                        <TableHead>Alternative name / Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deuterocanonical.map((book) => (
                        <TableRow key={book.identifier}>
                          <TableCell className="font-mono text-sm">{book.number}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {book.identifier}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{book.name}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {book.notes}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Reference: <a 
                    href="https://ubsicap.github.io/usfm/identification/books.html" 
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    USFM Book Identifiers Documentation
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default USFMReference;