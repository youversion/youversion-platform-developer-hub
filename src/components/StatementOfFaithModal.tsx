
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface StatementOfFaithModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

const StatementOfFaithModal = ({ open, onOpenChange, onAccept }: StatementOfFaithModalProps) => {
  const handleAccept = () => {
    onAccept();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>YouVersion Statement of Faith</DialogTitle>
          <DialogDescription>
            Please review our Statement of Faith below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <div>
            <h2 className="font-semibold mb-2">YouVersion Statement of Faith</h2>
            <p>In Essential Beliefs – we have unity. There is one Body and one Spirit…there is one Lord, one faith, one baptism, and one God and Father of us all … (Ephesians 4:4-6 NIV)</p>
            <p>In Non-Essential Beliefs – we have liberty. Accept him whose faith is weak, without passing judgment on disputable matters…Who are you to judge someone else’s servant? To his own master he stands or falls…So then each of us will give an account of himself to God…So whatever you believe about these things keep between yourself and God. (Romans 14:1, 4, 12, 22 NIV)</p>
            <p>In All Our Beliefs – we show charity. If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have a faith that can move mountains, but have not love, I am nothing. (1 Corinthians 13:2 NIV)</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Essential Beliefs:</h3>
            <h4 className="font-semibold mb-2">About God:</h4>
            <p>God is the Creator and Ruler of the universe. He has eternally existed as the Father, the Son, and the Holy Spirit. These three are coequal and are one God. (Genesis 1:1, 26, 27, 3:22; Psalm 90:2; Matthew 28:19; 2 Corinthians 13:14).</p>
            <h4 className="font-semibold mb-2">About Jesus Christ:</h4>
            <p>Jesus is the Son of God. He is coequal with the Father and Holy Spirit. Jesus lived a sinless human life and offered Himself as the perfect sacrifice for the sins of all people by dying on a cross. He arose from the dead after three days to demonstrate His power over sin and death. He ascended to Heaven and will return again someday to earth to reign as King. (Matthew 1:22, 23; Isaiah 9:6; John 1:1-5; Hebrews 4:14-15; 1 Corinthians 15:3-4; Romans 1:3-4; Acts 1:9-11; Colossian 2:9-10; 1 Timothy 6:14-15).</p>
            <h4 className="font-semibold mb-2">About the Holy Spirit:</h4>
            <p>The Holy Spirit is coequal with the Father and the Son of God. He is present in the world to make people aware of their need for Jesus Christ. He provides Christians with power for living, understanding of spiritual truth, and guidance in doing what is right. He gives every believer spiritual gifts when they are saved. As Christians, we seek to live under His control daily. (Acts 1:8; John 14:16-17, 16:7-13; Galatians 5:25; 1 Corinthians 2:12, 3:16; Ephesians 1:13; 2 Corinthians 13:14; 1 Peter 1:2).</p>
            <h4 className="font-semibold mb-2">About the Bible:</h4>
            <p>The Bible is God’s Word to us. It was written by human authors, under the supernatural guidance of the Holy Spirit. It is the supreme source of truth for Christian beliefs about living. Because it is inspired by God, it is truth without error. (2 Timothy 3:16; 2 Peter 1:20-21; Psalm 119:160, 12:6; Proverbs 30:5; Isaiah 55:11).</p>
            <h4 className="font-semibold mb-2">About Human Beings:</h4>
            <p>People are made in the spiritual image of God, to be like Him in character. People are the supreme object of God’s creation. Although every person has tremendous potential for good, all of us are marred by an attitude of disobedience toward God called “sin.” Sin separates us from God and causes many problems in our life. (Genesis 1:27; Isaiah 53:6; Romans 3:23; Isaiah 59:1-2; Psalm 139:13-16; Colossians 2:13-15).</p>
            <h4 className="font-semibold mb-2">About Salvation:</h4>
            <p>Salvation is God’s free gift to us, but we must accept it. We can never make up for our sin by self-improvement or good works. Only by trusting in Jesus Christ as God’s offer of forgiveness can anyone be saved from sin’s penalty. When we turn from our self-ruled life and turn to Jesus in faith, we are saved. Eternal life begins the moment one receives Jesus Christ into their life by faith. (Romans 6:23; Ephesians 2:8-9; John 14:6; Romans 5:1, 5:8, 10:9-10).</p>
            <h4 className="font-semibold mb-2">About Eternity:</h4>
            <p>People were created to exist forever. We will either exist eternally separated from God by sin or eternally with God through forgiveness and salvation. To be eternally separated from God is hell. To be eternally in union with Him is eternal life in Heaven. Heaven and hell are real places of eternal existence. (John 3:16, 14:17; Romans 6:23; Revelation 20:15; Philippians 2:5-11; Matthew 25:31-34, 25:41).</p>
            <h4 className="font-semibold mb-2">About Baptism:</h4>
            <p>Baptism is symbolic of the death, burial, and resurrection of Christ. Once we have accepted Jesus as our Lord and Savior, baptism is a way for us to publicly declare our new life in Christ. It is also a step of obedience based on God’s commands and allows us to follow the example of Jesus, who submitted Himself to baptism to “fulfill all righteousness.” (Matthew 3:16-17, 28:18-20; Acts 2:41, 8:12; Romans 6:4; Colossians 2:12).</p>
          </div>

        </div>

        <DialogFooter>
          <Button variant="stroked" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleAccept}>
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatementOfFaithModal;
